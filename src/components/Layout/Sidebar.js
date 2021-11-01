import React from 'react';
import {
  MdNotificationsActive,
  MdSearch,
  MdBlock,
  MdExitToApp
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from '../../utils/bemnames';

const sidebarBackground = {
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navItems = [
  // { to: '/', name: 'Science Lab', exact: true, Icon: MdSearch },
  // { to: '/quiz_questions', name: 'Notification', exact: false, Icon: MdNotificationsActive },
  // { to: '/blocked_list', name: 'Blocked Users', exact: false, Icon: MdBlock }
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <BSNavLink className="navbar-brand d-flex"
              tag={NavLink}
              to={'/'}
              exact={false}>
              <span className="text-white">
                Teenpatto GOLD
              </span>
            </BSNavLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
            <NavItem key={4} className={bem.e('nav-item')}>
              <BSNavLink
                id={`navItem-logout-${4}`}
                className="text-uppercase btn"
                onClick={this.props.resetAccessToken}
                activeClassName="active"
                style={{ cursor: 'pointer' }}
              >
                <MdExitToApp className={bem.e('nav-item-icon')} />
                <span className="">Logout</span>
              </BSNavLink>
            </NavItem>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
