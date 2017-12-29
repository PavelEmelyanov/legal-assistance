(function () {
    //Prototype utils
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };

    Date.prototype.addMonths = function (months) {
        var date = this;
        date.setMonth(date.getMonth() + parseInt(months));
    }
})();