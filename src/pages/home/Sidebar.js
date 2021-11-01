import React from 'react';
import { MdStars, MdExitToApp, MdGamepad } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavLink as BSNavLink, } from 'reactstrap';
import bn from '../../utils/bemnames';

const sidebarBackground = {
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

//side bar content can be defined here
const navItems = [
  { to: '/user_list', name: 'User Management', exact: false, Icon: MdStars },
  { to: '/subscription_list', name: 'Subscription Management', exact: false, Icon: MdGamepad },
  { to: '/contact_support', name: 'Manage Contact Support', exact: false, Icon: MdGamepad },
  // { to: '/vertical_graph', name: 'Vertical Graph', exact: false, Icon: MdGamepad },
  { to: '/analytics_list', name: 'Analytics Management', exact: false, Icon: MdGamepad },
  { to: '/malamaal_deduction', name: 'Malamaal Deduction', exact: false, Icon: MdGamepad },
  { to: '/bot_manage', name: 'Gameplay Bot Manage', exact: false, Icon: MdGamepad },

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
                
              <span style={{'fontWeight': 'bold', textAlign: "center", color:"white", whiteSpace: "nowrap"}}>
              {/* <img alt={1} src={"/title.png"} height='100' width='100' /> */}
              <h3>Admin Panel</h3>
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
                  style={{whiteSpace: "nowrap"}}
                  // activeClassName="active"
                  exact={exact}
                >
                  {/* <Icon className={bem.e('nav-item-icon')} /> */}
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Nav>
          <Nav vertical>
            <NavItem key={4} className={bem.e('nav-item')}>
              <BSNavLink
                id={`navItem-logout-${4}`}
                className="text-uppercase btn"
                onClick={this.props.resetAccessToken}
                // activeClassName="active"
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
