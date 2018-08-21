/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojarraydataprovider'],
 function(oj, ko, $) {
  
    function IncidentsViewModel() {
      const self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.
    self.tags = ko.observableArray([]);
    $.getJSON("https://apex.oracle.com/pls/apex/priem/rinfo2/registry/")
      .then(users => {
        let tempArray = [];
        $.each(users.items, (idx, data) => {
          tempArray.push({
            value: data.p_name,
            code: data.p_name
          });
        });
        self.tags(tempArray);
      });

    self.tagsDataProvider = new oj.ArrayDataProvider(self.tags, {
        keyAttributes: 'value'
      });
	     self.searchTriggered = ko.observable();
    self.searchTerm = ko.observable();
    self.searchTimeStamp = ko.observable();

    self.search = function(event) {
      var eventTime = getCurrentTime();
      var trigger = event.type;
      var term;

      if (trigger === "ojValueUpdated") {
        // search triggered from input field
        // getting the search term from the ojValueUpdated event
        term = event['detail']['value'];
        trigger += " event";
      } else {
        // search triggered from end slot
        // getting the value from the element to use as the search term.
        term = document.getElementById("search").value;
        trigger = "click on search button";
      }

      self.searchTriggered("Search triggered by: " + trigger);
      self.searchTerm("Search term: " + term);
      self.searchTimeStamp("Last search fired at: " + eventTime);
    };

    function getCurrentTime() {
      var date = new Date();
      return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
    }

  
//  ko.applyBindings(new IncidentsViewModel());
 
      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new IncidentsViewModel();
  }
);
