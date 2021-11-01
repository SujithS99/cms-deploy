import React from 'react';
import { MdClearAll } from 'react-icons/md';
import { Button, Nav, Navbar } from 'reactstrap';
import bn from '../../utils/bemnames';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

const bem = bn.create('header');

  const Header = (props) => {
  let history = useHistory();

  const handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  const  handleClick = e => {
    history.push(e.target.id)
  };

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button color="primary" outline onClick={handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
        <Breadcrumbs aria-label="breadcrumb">
          {props.routeTitle.map(({title, route}) => (
            <Link key={route} style={{'cursor': 'pointer'}} id={route} color="inherit" onClick={handleClick}> {title} </Link>
          ))}
          
    </Breadcrumbs>
        </Nav>
      </Navbar>
    );
}

export default Header;
