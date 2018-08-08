# Pertfectial - TEST TASK

## Usage
1. Open terminal
2. Run "npm i"
2. Run command "gulp"

Always describe all aplication commands

----
Notes (remarks and advices):
Work process:
1. Always use .gitignore [README](https://www.atlassian.com/git/tutorials/saving-changes/gitignore)
2. Write README so other developers and/or reviewers could easily run and evaluate your code
3. /dist folder now is not like a dist it's /public, because /dist should be always added to .gitgnore, to not duplicate code which is minified, and doesn't make sense for dev, so it's a dynamic folder
4. Add /node_modules, IDE files, temp files to .gitignore, this will increase the speed of downloading to dev pc, and upload to the server, and decrease each push to the repo and also could potentially break env on another platform (like node sass ask to rebuild it)(see. 1)
5. Watch your dependencies in the package.json understanding of what is devDependencies and what is dependencies is pretty useful [README](https://medium.com/@stalonadsl948/dependencies-vs-devdependencies-926e096a3dee)

----
HTML:
1. As you used the form tag for this layout it's better to use (radio button) for payment method - on send or any interaction you'll be able to determine Payment method state
2. Don't use jpg/png if it's possible, in this case we added .svg's to Figma

JS:
1. Form do nothing.

----
CSS:
1. Payment method doesnt have "colored logo" on hover
2. Responsiveness is not accurate
3. It's better to separate CSS on (modules/components/views and variables/helpers or utils etc.) this will helps a lot in maintenance when project will grow
4. Arrow on tabs doesn't change its position
5. See in style.scss