

//Budget Controller
var budgetController = (function(){

    var Expanse = function(id,description,value){

        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function(id,description,value){

        this.id = id;
        this.description = description;
        this.value = value;
    };


    var data = {
        allItems: {
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        }
    };


    return{
        addItem: function(type, des ,val){

            var newItem,ID;

            // create new id
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            }else{ID=0;}
            
            //create new item based 'exp' or 'inc'
            if(type === 'exp'){
                newItem = new Expanse(ID, des, val);
            }
            if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            //push into data structure
            data.allItems[type].push(newItem);
            //return the new elements
            return newItem;
        },
        testing: function(){
            console.log(data);
        }
    };

})();

//*********UI Controller


var UIController = (function(){
    var DOMstrings = {
        inputType: '.add-type',
        inputDescription: '.add-description',
        inputValue: '.add-value',
        inputBtn: '.add-btn',
        incomeContainer: '.income-list',
        expensesContainer: '.expenses-list'
    };
    return{
        getInput: function(){

            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
            
        },
        addListItem: function(obj, type){
            var html,newHtml,element;
            // create html string with placeholder text
            if( type=== 'inc'){
                element = DOMstrings.incomeContainer;
            html ='<div class="item clearfix" id="income-%id%"><div class="item-description">%description%</div><div class="right clearfix"><div class="item-value">%value%</div><div class="item-delete-btn"><button classs="item-delete-btn"><i class="fal fa-times-circle"></i></button></div></div></div>';
            }
            else if (type === 'exp')
            {
                element = DOMstrings.expensesContainer;
            html ='<div class="item clearfix" id="expense-%id%"><div class="item-description">%description%</div><div class="right clearfix"><div class="item-value">%value%</div><div class="item-percentage">21%</div><div class="item-delete-btn"><button classs="item-delete-btn"><i class="fal fa-times-circle"></i></button></div></div></div>';
            }

            //replace the placeholder text with some data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert the html into the dom

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },
        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

           var fieldsArr = Array.prototype.slice.call(fields);

           fieldsArr.forEach(function(current, index,array){
               current.value = "";
           });
            fieldsArr[0].focus();
        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();

//Global App Controller
var controller = (function(budgetCtrl,UICtrl){


    var setupEventListeners = function(){

        var DOM = UICtrl.getDOMstrings();

        
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress', function(event){
        if (event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }

    });
    };

    var updateBudget = function(){
        // 1.calculate the budget

        // 2.return the budget

        // 3.display the budget on the ui
    }

    var ctrlAddItem = function(){
        var input, newItem;
        // 1.Get the filed input data
        var input = UICtrl.getInput();

        // 2. add the item to the budget controller

        var newItem = budgetCtrl.addItem(input.type,input.description,input.value);

        // 3. add the item to the ui
        UICtrl.addListItem(newItem, input.type);

        //for cleared fields

        UICtrl.clearFields();
        
        // 4.calculate the budget
        // 5. display the budget on ui
    };

    return {
        init: function(){
            console.log('app start');
            setupEventListeners();
        }
    };

})(budgetController,UIController);

controller.init();
 