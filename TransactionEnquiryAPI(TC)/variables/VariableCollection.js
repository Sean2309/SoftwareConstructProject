class VariableCollection {
    constructor(){
    this.variables = {};
    }
    
    addVariable(id){
        this.variables[id] = false;
    }

    getVariableStatus(id){
        return this.variables[id];
    }

    updateVariableStatus(id){
        this.variables[id] = true;
    }
} 

module.exports = VariableCollection;