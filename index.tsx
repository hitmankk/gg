import React from "react";
import ReactDOM from "react-dom";
import App from "./src/App";
import { Provider } from "react-redux";
import { legacy_createStore as createStore} from 'redux'



import reducer from "./src/redux/reducer";

const store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);