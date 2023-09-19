import React, { ReactElement } from 'react';
import { Header, Icon, Table, TableBody, TableCell, TableHead, TableRow} from "@ohif/ui";
import {useNavigate} from "react-router";
import { useAppConfig } from '@state';

function AdminUserListComponent(): ReactElement {

  const navigate = useNavigate();
  const [appConfig] = useAppConfig();

  const usersList = [
    {
      username: 'admin',
      name: 'John',
      surname: 'Doe',
      isAdmin: true,
    },
    {
      username: 'user',
      name: 'Peter',
      surname: 'Peterski',
      isAdmin: false,
    }
  ];

  const navigateHome = () => {
    navigate({ pathname: '/' });
  }

  const menuOptions = [{
    title: 'Logout',
    icon: '',
    onClick: () => {
      localStorage.removeItem('loggedIn')
      navigate({ pathname: '/' })
    }
  }]

  return (
    <div className="app">
      <Header
        menuOptions={menuOptions}
        isReturnEnabled={true}
        onClickReturnButton={navigateHome}
        WhiteLabeling={appConfig.whiteLabeling}
      >
      </Header>
      <div className="login-form w-[500px] mx-auto mt-[50px] bg-customblue-40 text-white p-[50px]">
        <h1 className="title">Users list</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell cellsNum="1">Username</TableCell>
              <TableCell cellsNum="1">Name</TableCell>
              <TableCell cellsNum="1">Lastname</TableCell>
              <TableCell cellsNum="1">Is admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              usersList.map((user) => <TableRow key={user.username}>
                <TableCell cellsNum="1">{ user.username }</TableCell>
                <TableCell cellsNum="1">{ user.name }</TableCell>
                <TableCell cellsNum="1">{ user.surname }</TableCell>
                <TableCell cellsNum="1">
                  { user.isAdmin ?
                    <Icon name="circled-checkmark" className="w-[20px]" /> :
                    <Icon name="cancel" className="w-[20px]" />
                  }
                </TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminUserListComponent;
