     
require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout','ojs/ojknockout-model',  'ojs/ojmodel', 'ojs/ojcollectiontabledatasource', 'ojs/ojtable', 'ojs/ojpagingcontrol'],
function(oj, ko, $)
{   
  function viewModel()
  {
    var self = this;
    console.log(' 1');
    
    self.serviceURL = "http://crys2:9712/ords/ws_admission/wao/a_table/";

    self.Resources = ko.observableArray([]);
    self.ResCol = ko.observable();  
    self.datasource = ko.observable();

    self.fetch = function(successCallBack) {
       console.log(' 5=' );
        self.ResCol().fetch({
            success: successCallBack,
            error: function(jqXHR, textStatus, errorThrown){
                console.log('Error in fetch: ' + textStatus);
            }
           
        });
       console.log(' 6=' );
    }
    console.log(' 21' );

    parseRes = function (response) {
        console.log(' 3='+response['resource_id'] );
        return {
            resource_id: response['resource_id'],
            resource_desc: response['resource_desc']};
    };
// Think of this as a single database record or a single table row.
    console.log(' 22' );
    var Resource = oj.Model.extend({
        urlRoot: self.serviceURL,
        parse: parseRes,
        idAttribute: 'resource_id'
    });
    console.log(' 23' );
    
    var myRes = new Resource();
    console.log(' 24' );

            // this defines our collection and what models it will hold
    var ResCollection = oj.Collection.extend({
        url: self.serviceURL,
        model: myRes
    });
    console.log(' 25' );

    self.ResCol(new ResCollection());
    console.log(' 26' );

    self.datasource(new oj.CollectionTableDataSource(self.ResCol()));

//    }); 

//   var resArray = [{resource_id: 1001, resource_desc: 'ADFPM 1001 neverending',resourceid: 1001, resourcedesc: 'ADFPM 1001 neverending'}];

//    self.datasource = new oj.PagingTableDataSource(new oj.CollectionTableDataSource(self.collection)); 
//    self.datasource2 = new oj.ArrayTableDataSource(resArray, {idAttribute: 'resourceid'});    

    console.log(' 2');
    

  }

  //var vmd = new viewModel;
 console.log(' 4');
     var vmd = new viewModel;

  $(document).ready (
   function()
   {
 console.log(' 90' );

            vmd.fetch(
                function(collection, response, options){
 console.log(' 91' + collection + response + options);
//                 var resData = collection;
                  // This will create a ko.observable() for each element
                  // in the deptData response and assign the resulting array
                  // to the Departments ko observeableArray.
 console.log(' 92');
//                  vmd.Resources = oj.KnockoutUtils.map(resData, null, true);
                  //perform a Knockout applyBindings() call binding this
                  // viewModel with the current DOM
 console.log(' 93');
                 ko.cleanNode(document.getElementById('tabler'));
 console.log(' 94');
                  ko.applyBindings(vmd, document.getElementById('tabler'));
                //Show the content div after the REST call is completed.
 console.log(' 95');
                  $('#tabler').show();
 console.log(' 96');
            });

//      ko.cleanNode(document.getElementById('tabler'));
//       console.log(' 2');
//      ko.applyBindings(vmd, document.getElementById('tabler'));
       console.log(' 97');
    }
  );
       console.log(' 99');
    return viewModel;

});	
