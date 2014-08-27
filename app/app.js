var printer = require('./printer');
var $ = require('jquery');
printer.print();
printer.print();
printer.print();

$( ".content" ).append( "<p>Content...</p>" );
