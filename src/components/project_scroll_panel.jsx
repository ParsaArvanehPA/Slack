import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {/* {value === index && <Box p={3}>{children}</Box>} */}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    width: "449px",
    marginTop: "10px",
    border: "1px solid #e8eaed",
    borderRight: "none",
    borderLeft: "none",
  },
}));

export default function ScrollableTabsButtonForce(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {props.projectList.map((project, index) => (
            <Tab
              label={project}
              icon={<PhoneIcon />}
              {...a11yProps({ index })}
              onClick={() => props.setProjectName(project)}
            />
          ))}

          {/* <Tab label="Channel ID 01" icon={<PhoneIcon />} {...a11yProps(0)} />
          <Tab
            label="Channel ID 02"
            icon={<FavoriteIcon />}
            {...a11yProps(1)}
          />
          <Tab
            label="Channel ID 03"
            icon={<PersonPinIcon />}
            {...a11yProps(2)}
          />
          <Tab label="Channel ID 04" icon={<HelpIcon />} {...a11yProps(3)} />
          <Tab
            label="Channel ID 05"
            icon={<ShoppingBasket />}
            {...a11yProps(4)}
          />
          <Tab label="Channel ID 06" icon={<ThumbDown />} {...a11yProps(5)} />
          <Tab label="Channel ID 07" icon={<ThumbUp />} {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Channel ID 01
      </TabPanel>
      <TabPanel value={value} index={1}>
        Channel ID 02
      </TabPanel>
      <TabPanel value={value} index={2}>
        Channel ID 03
      </TabPanel>
      <TabPanel value={value} index={3}>
        Channel ID 04
      </TabPanel>
      <TabPanel value={value} index={4}>
        Channel ID 05
      </TabPanel>
      <TabPanel value={value} index={5}>
        Channel ID 06
      </TabPanel>
      <TabPanel value={value} index={6}>
        Channel ID 07
      </TabPanel>
    </div>
  );
}
