var Request = require("request");


Request('http://shopicruit.myshopify.com/products.json', function(err, res, body){
    var inventory = JSON.parse(body);
    var targetedProducts = [];
    inventory['products'].reduce(function(acc, item){
            if (item.product_type === "Computer" || "Keyboard"){
            item.variants.forEach(function(item){
                targetedProducts.push({
                    id: item.id,
                    weightg:item.grams,
                    price:item.price
                });
            });
} 
});
var targetweightg  = 100000;
targetedProducts.sort(function(a , b){
    return b.weightg - a.weightg;
});


var result =[];

var answer = [];
 while (targetedProducts.length > 0) {
        var i;
        var sum = 0;
        var addedIndices = [];
        
        for (i = 0; i < targetedProducts.length; i++) {
            if (sum + targetedProducts[i].weightg <= targetweightg) {
                sum += targetedProducts[i].weightg;
                addedIndices.push(targetedProducts[i]);
            }
        }
        
        
        for (i = addedIndices.length; i >= 0; i--) {
            targetedProducts.splice(addedIndices[i], 1);
        }

        result.push(addedIndices);
    }

result.forEach(function(combination){
    var summary = combination.reduce(function(acc, product){
            
            acc.id += product.id+',';
            acc.totalweight += product.weightg;
            acc.totalprice += Number(product.price);
            return acc;
        },{id:'', totalweight:0, totalprice:0});

    answer.push(summary);

});

console.log(answer);

})