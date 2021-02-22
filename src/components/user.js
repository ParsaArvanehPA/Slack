import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  UrlField,
  DateField,
} from "react-admin";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="data.userInfo_userName" label="User name" />
      <TextField source="data.userInfo_firstName" label="First Name" />
      <TextField source="data.userInfo_lastName" label="Last Name" />
      <EmailField source="data.userInfo_email" label="Email" />
      <DateField source="data.userInfo_dateCreated" label="Joied Date" />
    </Datagrid>
  </List>
);
