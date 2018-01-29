// import Rx from '/node_modules/rxjs/Rx.js';
// import $ from 'jquery'
import DinnerModel from './model/dinnerModel.js'
import { MenuView } from './view/menuView.js'
import {WelcomeView} from "./view/welcomeView";
import {SelectDishView} from "./view/selectDishView";
import {DishDetailsView} from "./view/dishDetailsView";
import {DinnerOverviewView} from "./view/dinnerOverviewView";
import {DinnerPrintView} from "./view/dinnerPrintView";

function main() {
	//We instantiate our model
    let model = new DinnerModel();

    model.addDishToMenu(1);
    model.addDishToMenu(2);
    model.addDishToMenu(100);
    model.addDishToMenu(101);
    model.addDishToMenu(200);
    model.addDishToMenu(201);
    // And create the instance of ExampleView
    // let exampleView = new ExampleView($("#exampleView"));

	function getNode(id) {
		return document.getElementById(id);
    }

    let menuView = new MenuView(getNode('menu-view'), model);
	let welcomeView = new WelcomeView(getNode('welcome-view'), model);
	let selectDishView = new SelectDishView(getNode('select-dish-view'), model);
    let dishDetailsView = new DishDetailsView(getNode('dish-details-view'), model);
    let dinnerOverviewView = new DinnerOverviewView(getNode('dinner-overview-view'), model);
    let dinnerPrintView = new DinnerPrintView(getNode('dinner-print-view'), model);

    let allViews = [menuView, welcomeView, selectDishView, dishDetailsView, dinnerOverviewView, dinnerPrintView];

	function route(location) {
		function deactivateAllBut(viewsToActivate) {
			allViews.forEach(view => {view.active = viewsToActivate.includes(view);})
        }
		switch (location.hash) {
			case selectDishView.locationHash:
				deactivateAllBut([menuView, selectDishView]);
				break;
			case dishDetailsView.locationHash:
				deactivateAllBut([menuView, dishDetailsView]);
				break;
			case dinnerOverviewView.locationHash:
				deactivateAllBut([dinnerOverviewView]);
				break;
			case dinnerPrintView.locationHash:
                deactivateAllBut([dinnerPrintView]);
                break;
			default:
				deactivateAllBut([welcomeView]);
		}
	}

	function onLocationHashChange() {
		route(window.location);
    }

	window.addEventListener('hashchange', onLocationHashChange, false);

	route(window.location);
    
	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see menuView.js).
	 */

}

main();
