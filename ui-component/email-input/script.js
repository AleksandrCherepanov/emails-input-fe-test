class EmailInput {
    imgPath = "./style/img/remove.svg";
    imgAlt = "remove tag";
    
    emailList = [];
    validEmailList = [];

    constructor(inputElement, options) {
        this.inputElement = inputElement;
        
        this.input = inputElement.querySelector(
            options.inputTag !== undefined 
            ? options.inputTag
            : "input"
        );

        this.textInput = inputElement.querySelector(
            options.classDivInput !== undefined 
            ? options.classDivInput
            : ".text-input"            
        );

        this.options = options;

        this.imgPath = options.imgPath !== undefined 
            ? options.imgPath
            : this.imgPath;

        this.imgAlt = options.imgAlt !== undefined
            ? options.imgAlt
            : this.imgAlt;    

        this.input.addEventListener(
            "keydown", 
            this.eventEnterPressHandler.bind(this)
        );

        this.input.addEventListener(
            "focusout", 
            this.eventFocusOutHandler.bind(this)
        );

        this.input.addEventListener(
            "input", 
            this.eventCommaEnteringHandler.bind(this)
        );
    }

    eventEnterPressHandler(e) {
        if (e.keyCode === 13) {
            this.createTag(this.input.value);    
            this.input.value = "";
            e.preventDefault();                
        }
    }

    eventFocusOutHandler(e) {
        this.createTag(this.input.value);
        this.input.value = "";
        e.preventDefault();
    }

    eventCommaEnteringHandler(e) {
        var commaPos = this.input.value.indexOf(",");
        if (commaPos !== -1) {
            var tags = this.input.value.split(",")
            tags.forEach((function(el) {
                console.log(el);
                this.createTag(el);
                this.input.value = "";
                e.preventDefault();
            }).bind(this))
        } 
        e.preventDefault();
    }

    createTag(email) {
        var trimmedEmail = email.trim();

        if (trimmedEmail === "") {
            return;
        }
        
        var tagClass = "wrong-tag";
        if(this.isValidEmail(trimmedEmail)) {
            tagClass = "tag";
            this.validEmailList.push(trimmedEmail);
        }

        var newTag = this.createElementDiv(tagClass);

        var newTagText = this.createElementDiv("tag-text");    
        var newTagRemoveIcon = this.createElementDiv("tag-remove-icon");
        var newImg = this.createElementImg();    

        this.appendTextTo(trimmedEmail, newTagText);
        
        newTagRemoveIcon.appendChild(newImg)
        newTag.appendChild(newTagText);
        newTag.appendChild(newTagRemoveIcon);
        
        this.inputElement.insertBefore(newTag, this.textInput);
        this.emailList.push(trimmedEmail);
    }

    replaceEmailList(emailList) {
        this.emailList = [];
        while (this.inputElement.firstChild !== this.textInput) {
            this.inputElement.removeChild(this.inputElement.firstChild)
        }
        emailList.forEach((function(el) {
            this.createTag(el);        
        }).bind(this))
    }

    addRandomEmail() {
        var partLength = 7;
        var zoneLength = 3;
        
        var email = Math.random().toString(36).substr(0, partLength).replace('.', '') + 
            '@' +
            Math.random().toString(36).substr(0, partLength).replace('.', '') +
            '.com';
        
        this.createTag(email);    
    }

    getValidEmailCount() {
        return this.validEmailList.length;
    }

    createElementImg() {
        var newImg = document.createElement("img");
        newImg.src = this.imgPath;
        newImg.alt = this.imgAlt;

        return newImg;
    }

    appendTextTo(text, appendTo) {
        var textElement = document.createTextNode(text);
        appendTo.appendChild(textElement);
    }

    createElementDiv(className, ) {
        var newTag = document.createElement("div");
        newTag.className = className;  
        
        return newTag;
    }

    isValidEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}