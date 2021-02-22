import React from "react";
import "../css/textEditor.css";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertFromHTML, ContentState, Modifier } from "draft-js";
import { MDBContainer } from "mdbreact";
import { stateToHTML } from "draft-js-export-html";

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = editorState => {
            this.setState({
                editorState,
                editorContentHtml: stateToHTML(editorState.getCurrentContent())
            });
        };

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }

    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4,
            );
            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    appendBlocksFromHtml(emoji) {
        const editorState = this.state.editorState;
        const newBlockMap = convertFromHTML(emoji);
        const contentState = editorState.getCurrentContent();
        const blockMap = contentState.getBlocksAsArray();

        newBlockMap.contentBlocks = blockMap.concat(newBlockMap.contentBlocks);

        const newContentState =
            ContentState.createFromBlockArray(newBlockMap, newBlockMap.entityMap);
        const newEditorState = EditorState.createWithContent(newContentState);
        this.setState({ editorState: newEditorState });
    }

    insertEmoji = (emoji) => {
        const editorState = this.state.editorState;
        const newBlockMap = convertFromHTML(emoji);
        const contentState = editorState.getCurrentContent();
        const blockMap = contentState.getBlocksAsArray();
        newBlockMap.contentBlocks = blockMap.concat(newBlockMap.contentBlocks);

        const newContentState =
            ContentState.createFromBlockArray(newBlockMap, newBlockMap.entityMap);
        const newEditorState = EditorState.createWithContent(newContentState);
        this.setState({ editorState: newEditorState });
    }

    insertCharacter(characterToInsert, editorState) {
        const currentContent = editorState.getCurrentContent(),
              currentSelection = editorState.getSelection();
      
        const newContent = Modifier.replaceText(
          currentContent,
          currentSelection,
          characterToInsert
        );      
        const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
        this.setState({ editorState: EditorState.forceSelection(newEditorState, newContent.getSelectionAfter())});
      }

    componentWillReceiveProps(newProps) {

        if (newProps.emptyTextarea) {
            this.state = {
                editorState: EditorState.createEmpty()
            };
        } 
        if (newProps.emojiSelected) {
            this.insertCharacter(newProps.emoji,this.state.editorState);
            newProps.setFalseEmoji();
        }
    }

    render() {
        const { editorState } = this.state;
        let className = 'RichEditor-editor';
        this.props.textMessageHandler(this.state.editorContentHtml);

        return (
            <React.Fragment>
                <MDBContainer>
                    <div id="RichEditor-root" className="scrollbar scrollbar-night-fade" style={{ bottom: this.props.showTools ? "45px" : "15px" }} >
                        <div className={className} onClick={this.focus}>
                            {<Editor
                                blockStyleFn={getBlockStyle}
                                customStyleMap={styleMap}
                                editorState={editorState}
                                handleKeyCommand={this.handleKeyCommand}
                                keyBindingFn={this.mapKeyToEditorCommand}
                                onChange={this.onChange}
                                ref="editor"
                                spellCheck={true}
                            />}
                        </div>
                    </div>
                </MDBContainer>
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
            </React.Fragment>
        );
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls" id="block_types">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

export default TextEditor;
