stockData = (function () {

    var findByName = function (searchKey) {
      console.log(searchKey);
            var deferred = $.Deferred();
            var results = stocks.filter(function (element) {
                var name = element.name;
                console.log(name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1);
                return name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            console.log("results: ", results);
            deferred.resolve(results);
            return deferred.promise();
        },



        stocks = [
          {name:'GOOG', price: 733.89, perc: 2.8, change: 'up'},
        {name:'IBM', price: 900.19, perc: 200, change: 'up'},
        {name:'AMAZ', price: 23.11, perc: 2.8, change: 'down'},
        {name:'KIND', price: 100.21, perc: 4.2, change: 'down'},
        {name:'REWI', price: 98.20, perc: 1.1, change: 'up'},
        {name:'AFIC', price: 20.20, perc: 5.1, change: 'up'}
        ];

    // The public API
    return {

        findByName: findByName
    };

}());
