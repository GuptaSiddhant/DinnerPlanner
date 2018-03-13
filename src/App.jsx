// import Rx from '/node_modules/rxjs/Rx.js';
// import $ from 'jquery'
import DinnerModel from './model/dinnerModel.js'
import ReactDOM from 'react-dom';
import React from "react";
import {reducer, initialState} from "./model/store";
import AppComponent from "./AppComponent.jsx";
import * as Redux from "redux";
import {clickedDish} from "./actions";

function main() {
    //We instantiate our model
    let model = new DinnerModel();

    model.selectedDishesObservable.subscribe(function onNext(selectedDishes) {
        console.log("Selected dishes changed.");
    });

    // And create the instance of ExampleView
    // let exampleView = new ExampleView($("#exampleView"));

    function getNode(id) {
        return document.getElementById(id);
    }

    //
    // let menuView = new MenuView(getNode('menu-view'), model);
    // let menuController = new MenuController(menuView, model);
    // let welcomeView = new WelcomeView(getNode('welcome-view'), model);
    // let dishDetailsView = new DishDetailsView(getNode('dish-details-view'), model);
    // let dishDetailsViewController = new DishDetailsController(dishDetailsView, model);
    // let dinnerOverviewView = new DinnerOverviewView(getNode('dinner-overview-view'), model);
    // let dinnerPrintView = new DinnerPrintView(getNode('dinner-print-view'), model);
    //
    // let allViews = [menuView, welcomeView, dishDetailsView, dinnerOverviewView, dinnerPrintView];
    //
    // function route(location) {
    //     function deactivateAllBut(viewsToActivate) {
    //         allViews.forEach(view => {
    //             view.active = viewsToActivate.includes(view);
    //         })
    //     }
    //
    //     switch (location.hash.split('@')[0]) {
    //         case selectDishView.locationHash:
    //             deactivateAllBut([menuView]);
    //             break;
    //         case dishDetailsView.locationHash:
    //             deactivateAllBut([menuView, dishDetailsView]);
    //             break;
    //         case dinnerOverviewView.locationHash:
    //             deactivateAllBut([dinnerOverviewView]);
    //             break;
    //         case dinnerPrintView.locationHash:
    //             deactivateAllBut([dinnerPrintView]);
    //             break;
    //         default:
    //             deactivateAllBut([welcomeView]);
    //     }
    // }
    //
    // function onLocationHashChange() {
    //     route(window.location);
    // }
    //
    // window.addEventListener('hashchange', onLocationHashChange, false);
    //
    // route(window.location);

    let store = Redux.createStore(reducer);
    store.dispatch({type:"init"});

    console.log(store.getState());

    function render() {
        console.log(store.getState());
        ReactDOM.render(<AppComponent dispatch={store.dispatch}
                                      page={store.getState().get('page')}
                                      filteredDishesFunc={model.filteredDishes}
                                      dishTypes={model.dishTypes}/>, appContainer);

    }

    const appContainer = getNode("app-container");

    store.subscribe(render);

    render();
}

main();