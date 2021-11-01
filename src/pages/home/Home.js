import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import PageSpinner from '../../components/PageSpinner';
import UserList from '../Users/UserList';
import UserDetail from '../Users/UserDetail';
import SubscriptionList from '../Subscription/SubscriptionList';
import IndexPage from '../IndexPage';
import { BASE_PATH } from '../../config/settings';
import ContactSupport from '../contact/ContactSupport';
// import UserVsScore from '../graph/UserVsScore';
import MalamalDeduction from '../contact/MalamalDeduction';
import AnalyticsList from '../analytics/AnalyticsList';
import BotManage from '../botManage/BotManage';

//different routes of the project
const routePaths = [
  { to: '/', title: [{route: '/', title: ''}], Component: IndexPage },
  { to: '/user_list', title: [{route: '/user_list', title: 'User Management'}], Component: UserList },
  { to: '/user_detail/:userId', title: '', Component: UserDetail },
  { to: '/subscription_list', title: [{route: '/subscription_list', title: 'Subscription Management'}], Component: SubscriptionList },
  { to: '/contact_support', title: [{route: '/contact_support', title: 'Manage Contact Support'}], Component: ContactSupport },
  // { to: '/vertical_graph', title: [{route: '/vertical_graph', title: 'Vertical Graph'}], Component: UserVsScore },
  { to: '/malamaal_deduction', title: [{route: '/malamaal_deduction', title: 'Malamaal Deduction'}], Component: MalamalDeduction },
  { to: '/analytics_list', title: [{route: '/analytics_list', title: 'Analytics Management'}], Component: AnalyticsList },
  { to: '/bot_manage', title: [{route: '/bot_manage', title: 'Gameplay Bot Manage'}], Component: BotManage }

];

export default function Home(props) {
  // const [routeTitle, setRouteTitle] = useState("");
  const [routeBreadCrumbs, setRouteBreadCrumbs] = useState([]);
  return (
    <Router basename={BASE_PATH}>
      <div className="d-flex">
        <MainLayout {...props} breakpoint={props.breakpoint} routeTitle={routeBreadCrumbs}>
          <React.Suspense fallback={<PageSpinner />}>
            {routePaths.map(({ to, Component, title }) => (<Route key={to} exact path={to} render={() => { 
              // setRouteTitle(title ? title : routeBreadCrumbs); 
              return (<Component {...props} setRouteBreadCrumbs={(updatedRoutes) => {setRouteBreadCrumbs(updatedRoutes)}} routeBreadCrumbs={routeBreadCrumbs}/>) }} />))}
          </React.Suspense>
        </MainLayout>
      </div>
    </Router>
  );
}
