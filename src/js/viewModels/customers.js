/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout',  'ojs/ojmodel','ojs/ojcollectiontabledatasource','ojs/ojtable', 'ojs/ojinputtext','ojs/ojbutton', 'ojs/ojdatacollection-common'],
        function (oj, ko, $) {

            function CustomerViewModel() {
                var self = this;
//                self.data = ko.observableArray();
                self.serviceURL = 'https://apex.oracle.com/pls/apex/ask2/rinfo/patient_in/';
                self.PatCol = ko.observable();
                self.datasource = ko.observable();
                self.nameSearch = ko.observable('');
                self.currentRawValue = ko.observable();

                self.refreshClick = function (data, event) {
                    self.PatCol().fetch();
//                    $('#table').ojTable('refresh');
                };

                self.optionChangeCallback = function (event, data) {
                    if (data['option'] === "rawValue"){
                        self.PatCol().fetch();
                    };
                };

                function getVerb(verb) {
                    if (verb === "update") {
                        return 'POST';
                    }
                    if (verb === "delete") {
                        return "DELETE";
                    }
                    if (verb === "create") {
                        return "PUT"
                    }
                    return 'GET';
                };

                function getURL(operation, collection, options) {
                    var retObj = {};
                    retObj['type'] = getVerb(operation);
                    retObj['url'] = self.serviceURL + self.nameSearch().toString();
                    console.log('getURL:'+self.serviceURL + self.currentRawValue().toString()+'*'+ self.nameSearch().toString());
                    return self.serviceURL + self.currentRawValue().toString();
                };
                
                console.log('1');                
                /**
                 * Callback to map attributes returned from RESTful data service to desired view model attribute names
                 */
                parsePat = function (response) {
                console.log('3');
                return {case_history_id: response['case_history_id'],
                        show_id: response['show_id'],
                        show_fullname: response['show_fullname'],
                        date_in: new Date(response['date_in']).toLocaleString("ru",{day:'numeric',month:'2-digit',year: '2-digit'}),
                        date_out: new Date(response['date_out']).toLocaleString("ru",{day:'numeric',month:'2-digit',year: '2-digit'}),
                        division_name: response['division_name']};
                };
                
                var PatRecord = oj.Model.extend({
                    url: self.serviceURL,
                    parse: parsePat,
                    idAttribute: 'case_history_id'});
                
                self.pat = new PatRecord();

                self.parsePatCollection = function (response) {
                    console.log('2');
                    if (response.hasOwnProperty('items')) {
                        var subVal = response['items'];
//                        return subVal;
                        if (subVal.hasOwnProperty('0')) {
                            return subVal['0'].patients;
                        }
                    }
                    return subVal;
                };

                // Create a base object "class" for the entire task dataset 
                self.PatCollection = oj.Collection.extend({
                    url: getURL,
                    model: self.pat,
                    parse: self.parsePatCollection,
                    comparator: 'case_history_id'
                 });

                // Create a specific instance for the tasks.  This will be filled with instances of the
                // model "task" for each record when the data is retrieved from the data service
//                var pats = new PatCollection();
                self.PatCol(new self.PatCollection());          
                self.datasource(new oj.CollectionTableDataSource(self.PatCol()));
/*
                // Get the tasks from the server, and call the success: function when finished for further application processing
                pats.fetch({success: function (collection, response, options) {
                        patsData = collection;
                        renderPatViews(patsData);
                    }});
                
                renderPatViews = function (patsData) {
                    // self.tasks is the Knockout view model structure
                    this.pats = oj.KnockoutUtils.map(data);
                    var self = this;
                }                
                

                self.datasource = new oj.ArrayTableDataSource(
                        self.data,
                        {idAttribute: 'case_history_id'}
            ); 
    
*/   
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new CustomerViewModel();
  }
);
