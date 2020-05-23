"use strict";

function EmailInput(inputElement, options) {
    this._emailList = [];

    this._imgPath = "./style/img/remove.svg";
    this._imgAlt = "remove tag";
    this._eventChange = "change";
    this._parentOfInputId = "#emails-input-text-1";

    this._inputElement = inputElement;
    this._eventChangeType = this._inputElement.id + ' ' + this._eventChange;

    this._input = inputElement.querySelector("input");
    var parentOfInputId = options.parentOfInputId !== undefined 
        ? options.parentOfInputId 
        : this._parentOfInputId

    this._parentOfInputElement = inputElement.querySelector(parentOfInputId);

    this._imgPath = options.imgPath !== undefined ? options.imgPath : this._imgPath;
    this._imgAlt = options.imgAlt !== undefined ? options.imgAlt : this._imgAlt;    

    this._dispatchEmailListChangeEvent = function(emailListBefore, emailListAfter) {
        this._inputElement.dispatchEvent(new CustomEvent(
            this._eventChangeType, 
            {
                 bubbles: true, 
                 detail: {emailListBefore: emailListBefore, emailListAfter: emailListAfter }
            }
        ));
    }

    this._removeTag = function(elementRemove) {
        var emailListBefore = JSON.parse(JSON.stringify(this._emailList));        
        var emailRemove = elementRemove.querySelector(".tag-text").textContent;
        var indexRemove = this._emailList.indexOf(emailRemove);
        
        if (indexRemove > -1) {
            this._emailList.splice(indexRemove, 1);        
        }

        elementRemove.remove();
        var emailListAfter = JSON.parse(JSON.stringify(this._emailList));

        this._dispatchEmailListChangeEvent(emailListBefore, emailListAfter);
    }

    this._isValidEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    this._createElementDiv = function(className) {
        var newTag = document.createElement("div");
        newTag.className = className;  
        
        return newTag;
    }

    this._createElementImg = function() {
        var newImg = document.createElement("img");
        newImg.src = this._imgPath;
        newImg.alt = this._imgAlt;
        newImg.addEventListener("click", (function(e) {
            this._removeTag(e.target.parentElement.parentElement);
        }).bind(this));

        return newImg;
    }

    this._appendTextTo = function(text, appendTo) {
        var textElement = document.createTextNode(text);
        appendTo.appendChild(textElement);
    }

    this._createTag = function(email) {
        var trimmedEmail = email.trim();

        if (trimmedEmail === "") {
            return;
        }
        
        var tagClass = this._isValidEmail(trimmedEmail) ? "tag" : "wrong-tag";
        var newTag = this._createElementDiv(tagClass);

        var newTagText = this._createElementDiv("tag-text");    
        var newTagRemoveIcon = this._createElementDiv("tag-remove-icon");
        var newImg = this._createElementImg();    

        this._appendTextTo(trimmedEmail, newTagText);
        
        newTagRemoveIcon.appendChild(newImg)
        newTag.appendChild(newTagText);
        newTag.appendChild(newTagRemoveIcon);
        
        console.log(this._parentOfInputElement);
        this._inputElement.insertBefore(newTag, this._parentOfInputElement);
        
        var emailListBefore = JSON.parse(JSON.stringify(this._emailList));
        this._emailList.push(trimmedEmail);
        var emailListAfter = JSON.parse(JSON.stringify(this._emailList));

        this._dispatchEmailListChangeEvent(emailListBefore, emailListAfter);
    }

    this._eventEnterPressHandler = function (e) {
        if (e.keyCode === 13) {
            this._createTag(this._input.value);    
            this._input.value = "";
            e.preventDefault();
            e.stopPropagation();                
        }
    }

    this._eventFocusOutHandler = function(e) {
        this._createTag(this._input.value);
        this._input.value = "";
        e.preventDefault();
        e.stopPropagation();
    }

    this._eventCommaEnteringHandler = function(e) {
        var commaPos = this._input.value.indexOf(",");
        if (commaPos !== -1) {
            var tags = this._input.value.split(",")
            tags.forEach((function(el) {
                this._createTag(el);
                this._input.value = "";
            }).bind(this))
        } 
        e.preventDefault();
        e.stopPropagation();
    }

    this._input.addEventListener("keydown", this._eventEnterPressHandler.bind(this));
    this._input.addEventListener("focusout", this._eventFocusOutHandler.bind(this));
    this._input.addEventListener("input", this._eventCommaEnteringHandler.bind(this));

    this.replaceEmailList = function(emailList) {
        var emailListBefore = JSON.parse(JSON.stringify(this._emailList));
        this._emailList = [];
        var emailListAfter = JSON.parse(JSON.stringify(this._emailList));

        this._dispatchEmailListChangeEvent(emailListBefore, emailListAfter);
        
        while (this._inputElement.firstChild !== this._parentOfInputElement) {
            this._inputElement.removeChild(this._inputElement.firstChild)
        }
        emailList.forEach((function(el) {
            this._createTag(el);        
        }).bind(this))
    }

    this.addRandomEmail = function() {
        var partLength = 7;
        var zoneLength = 3;
        
        var email = Math.random().toString(36).substr(0, partLength).replace('.', '') + 
            '@' +
            Math.random().toString(36).substr(0, partLength).replace('.', '') +
            '.com';
        
        this._createTag(email);    
    }

    this.getValidEmailCount = function() {
        return this._emailList.filter((function(el) {
            return this._isValidEmail(el);
        }).bind(this)).length;
    }

    this.getEmailList = function() {
        return this._emailList;
    }

    this.emailListChangeEventSubscribe = function(element, callback) {
        element.addEventListener(this._eventChangeType, callback);
    }
}