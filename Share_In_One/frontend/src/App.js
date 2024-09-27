import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './components/admin/Admin';
import Login from './components/admin/Login';
import Users from './components/admin/Users';
import NewLogin from './components/auth/Login';
import NewRegister from './components/auth/Register';
import Buy from './components/calculator/Buy';
import Sell from './components/calculator/Sell';
import { Chart } from './components/chart/Chart';
import { Dashboard } from './components/dashboard/Dashboard';
import { SharePrice } from './components/dashboard/SharePrice';
import Home from './components/home/Home';
import { Prediction } from './components/prediction/Prediction';
import { ProfitTarget } from './components/target/ProfitTarget';
import { StopLoss } from './components/target/StopLoss';
import { WatchList } from './components/watchlist/WatchList';
import { PrivateRoute } from './utils/PrivateRoute';
import { PublicRoute } from './utils/PublicRoute';

function App() {
	return (
		<>
			{/* new Router */}
			<Router>
				<Switch>
					<PublicRoute path='/' exact component={Home} />
					<PublicRoute path='/login' exact component={NewLogin} />
					<PublicRoute path='/register' exact component={NewRegister} />
					<PrivateRoute path='/calculator/sell' exact component={Sell} />
					<PrivateRoute path='/calculator/buy' exact component={Buy} />
					<PrivateRoute path='/dashboard' exact component={Dashboard} />
					<PrivateRoute path='/shares' exact component={SharePrice} />
					<PrivateRoute path='/prediction' exact component={Prediction} />
					<PrivateRoute path='/watchlist' exact component={WatchList} />
					<Route path='/admin/login' exact component={Login} />
					<Route path='/admin' exact component={Admin} />
					<Route path='/admin/users' exact component={Users} />
					<PrivateRoute path='/chart' exact component={Chart} />
					<PrivateRoute path='/stop-loss' exact component={StopLoss} />
					<PrivateRoute path='/profit-target' exact component={ProfitTarget} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
