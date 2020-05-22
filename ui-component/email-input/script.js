class EmailInput {
    constructor(inputElement, options) {
        this.inputElement = inputElement;
        this.input = inputElement.querySelector("input");
        this.textInput = inputElement.querySelector(".text-input");
        this.options = options;

        var enterHandler = (function(e) {
            if (e.keyCode === 13) {
                var newTag = document.createElement("DIV");
                newTag.className = "tag";
                
                var newTagText = document.createElement("DIV");
                newTagText.className = "tag-text"
                
                var text = document.createTextNode(this.input.value);
                newTagText.appendChild(text);
                
                var newTagRemoveIcon = document.createElement("DIV");
                newTagRemoveIcon.className = "tag-remove-icon"
                
                var newImg = document.createElement("IMG");
                newImg.src = "./style/img/remove.svg";
                newImg.alt = "remove tag"
                
                newTagRemoveIcon.appendChild(newImg)
                newTag.appendChild(newTagText);
                newTag.appendChild(newTagRemoveIcon);
                
                this.inputElement.insertBefore(newTag, this.textInput);    

                this.input.value = "";
                e.preventDefault();                
            }
        }).bind(this);

        this.input.addEventListener("keydown", enterHandler);

        var focusHandler = (function(e) {
            var newTag = document.createElement("DIV");
            newTag.className = "tag";
            
            var newTagText = document.createElement("DIV");
            newTagText.className = "tag-text"
            
            var text = document.createTextNode(this.input.value);
            newTagText.appendChild(text);
            
            var newTagRemoveIcon = document.createElement("DIV");
            newTagRemoveIcon.className = "tag-remove-icon"
            
            var newImg = document.createElement("IMG");
            newImg.src = "./style/img/remove.svg";
            newImg.alt = "remove tag"
            
            newTagRemoveIcon.appendChild(newImg)
            newTag.appendChild(newTagText);
            newTag.appendChild(newTagRemoveIcon);
            
            this.inputElement.insertBefore(newTag, this.textInput);    

            this.input.value = "";
            e.preventDefault();              
        }).bind(this);    

        this.input.addEventListener("focusout", focusHandler)
        
        var inputHandler = (function(e) {
            var commaPos = this.input.value.indexOf(",");
            if (commaPos !== -1) {
                var tags = this.input.value.split(",")
                tags.forEach((function(el) {
                    var newTag = document.createElement("DIV");
                    newTag.className = "tag";
                    
                    var newTagText = document.createElement("DIV");
                    newTagText.className = "tag-text"
                    
                    var text = document.createTextNode(el);
                    newTagText.appendChild(text);
                    
                    var newTagRemoveIcon = document.createElement("DIV");
                    newTagRemoveIcon.className = "tag-remove-icon"
                    
                    var newImg = document.createElement("IMG");
                    newImg.src = "./style/img/remove.svg";
                    newImg.alt = "remove tag"
                    
                    newTagRemoveIcon.appendChild(newImg)
                    newTag.appendChild(newTagText);
                    newTag.appendChild(newTagRemoveIcon);
                    
                    this.inputElement.insertBefore(newTag, this.textInput);    

                    this.input.value = "";
                    e.preventDefault();
                }).bind(this))
            } 
            e.preventDefault()        
        }).bind(this);

        this.input.addEventListener("input", inputHandler);
    }
}