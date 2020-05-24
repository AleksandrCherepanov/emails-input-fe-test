## Emails Input

You can use this input for allowing your users to enter and work with a list of emails. Code and styles of computent are located in `ui-component/email-input` folder. After enetering comma, pressing "Enter" or change focus from input, email will become as tags. Backspace allows you remove both the text and tags if the input is empty.

 ## Feature list
1. Entering and removing email from list
2. Add random email to list
3. Replace email list with a new ones
4. Get list of all email
5. Get count of valid emails
6. Subscribe to event of changing list both of adding or removing
7. Only unque emails are allowed for entering

## Usage
**The sturcture of html:**

	<div  class="emails-input" id="emails-input-1">
		<div  class="text-input" id="emails-input-text-1">
			<input  type="email" autocomplete="off"  placeholder="add more people...">
		</div>
	</div>

**The instance of emails input creation:**

		var  inputEmail = document.querySelector("#emails-input-1");
		var  emailInput = new  EmailInput(inputEmail, {
			parentOfInputId:  "#emails-input-text-1",
			removeIconPath:  "./ui-component/email-input/style/img/remove.svg"
		});
	
For creation emails input you must transfer several parameters into constructor.
1. `inputElement` - element of emails input from DOM of a page. In our case this element with id: `"#emails-input-1"`
2. `options` - is an object of different parameters:
	* `parentOfInputId` - id of element which is a parent of input tag inside the email input. Default value - `#emails-input-text-1`
	* `removeIconPath`	- absolute path to the remove icon, which will be shown on the email tag after entering email into the list. Default value - `./ui-component/email-input/style/img/remove.svg` 

**Using methods**
1. Get valid email count.
			
			var  countEmailBtn = document.getElementById("count-email");
			countEmailBtn.addEventListener("click", function(e) {
					alert(emailInput.getValidEmailCount());
			})	
2. Add random email.
			
			var  addEmailBtn = document.getElementById("add-email");
			addEmailBtn.addEventListener("click", function(e) {
					emailInput.addRandomEmail();
			});
3. Replace list of email with new ones.
		
			var  replaceEmailBtn = document.getElementById("replace-email");
			replaceEmailBtn.addEventListener("click", function(e) {
				emailInput.replaceEmailList(["a@a.com", "b@b.com", "asdasd"]);
			});
4. Get email list
			
			var  getEmailListBtn = document.getElementById("get-email");
			getEmailListBtn.addEventListener("click", function(e) {
				emailInput.getEmailList();
			});
5. Subscribe on the email list changes
			
			emailInput.emailListChangeEventSubscribe(document, function(e) {
				console.log(e.detail);
			})