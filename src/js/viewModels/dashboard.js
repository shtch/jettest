/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojtable' ,'ojs/ojcollectiontabledatasource' , 'ojs/ojswitch','ojs/ojdatetimepicker', 'ojs/ojknockout', 'ojs/ojmodel', 'ojs/ojselectcombobox'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
        var self = this;
        self.serviceURL = 'https://apex.oracle.com/pls/apex/ask2/rinfo/patient_in/';
       // Below are a set of the ViewModel methods invoked by the oj-module component.
        // Please reference the oj-module jsDoc for additional information.
       	self.isChecked = ko.observable(false);
        self.isChecked.subscribe(function (newValue){
            self.disabledState(!newValue);
        });        
		
		self.disabledState = ko.observable(false);
        self.nameSearch = ko.observable();
		self.nameSearchRawValue = ko.observable();
		self.nameSearchRawValue.subscribe(function (newValue){
                self.PatCol().fetch();
        });        
			
       //self.currentRawValue = ko.observable();
		self.datasource = ko.observable();
	  
//        self.optionChangeCallback = function (event, data) {
//            if (data['option'] === "rawValue"){
//                self.PatCol().fetch();
//                console.log('4');
//            };
//        };                

        self.refreshClick = function (data, event) {
			self.PatCol().fetch();
//      		$('table').ojTable('refresh');
                console.log('5');
			
			};
			
        function getURL(operation, collection, options) {
            var retObj = {};
            console.log('getURL');

			//                    retObj['type'] = getVerb(operation);
            retObj['url'] = self.serviceURL + self.nameSearchRawValue();//.toString();
            console.log('getURL:'+retObj['url']); ///self.serviceURL + self.currentRawValue().toString()+'*'+ self.nameSearch().toString());
			if (typeof self.nameSearchRawValue() === "undefined") {
              return self.serviceURL;
			} else {
              return self.serviceURL + self.nameSearchRawValue().toString();
			};
        };
	
        self.PatCol = ko.observable();
                /**
                 * Callback to map attributes returned from RESTful data service to desired view model attribute names
                 */
                parsePat = function (response) {
                console.log('parsePat.response');
                return {case_history_id: response['case_history_id'],
                        show_id: response['show_id'],
                        show_fullname: response['show_fullname'],
                        tempr_m: response['tempr_m'],
                        date_in: new Date(response['date_in']).toLocaleString("ru",{day:'numeric',month:'2-digit',year: '2-digit'}),
//                        date_out: new Date(response['date_out']).toLocaleString("ru",{day:'numeric',month:'2-digit',year: '2-digit'}),
                        division_name: response['division_name'],
                        division_name: response['division_name'],
                        ward_name: response['ward_name'],
                        sost: response['sost'],
                        doctor_name: response['doctor_name'],
                        dataoperation: (Date.parse(response['dataoperation'])?new Date(response['dataoperation']).toLocaleString("ru",{day:'numeric',month:'2-digit',year: '2-digit'}):''),
                        pass_type_name: response['pass_type_name']
						};
                };

                self.parsePatCollection = function (response) {
                    console.log('parsePatCollection.response');
                    if (response.hasOwnProperty('items')) {
                        var subVal = response['items'];
//                        return subVal;
                        if (subVal.hasOwnProperty('0')) {
                            return subVal['0'].patients;
                        }
                    }
                    return subVal;
                };
				
        self.PatRecord = oj.Model.extend({
            urlRoot: self.serviceURL,
            parse: parsePat,
            idAttribute: 'case_history_id'
		});				
		
        self.pat = new self.PatRecord();
		
        self.PatCollection = oj.Collection.extend({
            url: getURL,
            model: self.pat,
            parse: self.parsePatCollection,
            comparator: 'case_history_id'
        });

		
        self.PatCol(new self.PatCollection()); 
		
//		self.PatCol().fetch();
		
        self.datasource(new oj.CollectionTableDataSource(self.PatCol()));
        console.log('6');
		
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
	dvm = new DashboardViewModel();	 
//	ko.applyBindings(dvm);
    console.log('7');
	return (dvm);
//return (new DashboardViewModel());
//  ko.applyBindings(new DashboardViewModel());	
  }
);
