
var calc_details;

var calc_det_Jahr = "";
var calc_det_mRate = "";
var calc_det_STlg = "";
var calc_det_Rest = "";

var showDetails = false;

function toggleDetails() { 
	showDetails = !showDetails;
	recalculate();
}

var language = "en";

function translate(){
  	if (language === "de"){
  		document.getElementById("title").innerHTML = "Kreditrechner"; 
  		document.getElementById("heading").innerHTML = "Zinsrechner"; 
  		document.getElementById("input_names").innerHTML = "Dauer: <br>"
			+ "Zinssatz: <br>"
			+ "Betrag: <br>"
			+ "Rate:<br>"
			+ "Sondertilgung:";
  		document.getElementById("input_units").innerHTML = "Jahre <br>"
			+ "%<br>"
			+ "€<br>"
			+ "<select name=\x22op\x22 onchange=\x22recalculate()\x22>"
			+ "		<option value=\x220\x22>in €</option>"
			+ "		<option value=\x221\x22>in % Tilgung</option>"
			+ "</select>"				
			+ "<br>"
			+ "€ pro Jahr";	
  		document.getElementById("output_names").innerHTML = "Restschuld:" 	
			+ "	Eingezahlt:";

  	}
  	if (language === "en"){
  		document.getElementById("title").innerHTML = "Kredit Calculator"; 
  		document.getElementById("heading").innerHTML = "Interest Calculator"; 
  		document.getElementById("input_names").innerHTML = "Duration: <br>"
			+ "Interest: <br>"
			+ "Amount: <br>"
			+ "Monthl. Rate:<br>"
			+ "Yearl. Rate:";
  		document.getElementById("input_units").innerHTML = "years <br>"
			+ "%<br>"
			+ "€<br>"
			+ "<select name=\x22op\x22 onchange=\x22recalculate()\x22>"
			+ "		<option value=\x220\x22> €</option>"
			+ "		<option value=\x221\x22> % amortization</option>"
			+ "</select>"				
			+ "<br>"
			+ "€ per year";	
  		document.getElementById("output_names").innerHTML = "Residual debt:" 	
			+ "	Deposited:";

	
  	}
}

function recalculate() { 


	calc_details = "";	
	calc_det_Jahr = "Jahr <br>";
	calc_det_mRate = "monatl. Rate <br>";
	calc_det_STlg = "Sondertilgung <br>";
	calc_det_Rest = "Restschuld <br>";




		//get form
		var form = document.getElementById("inputs");

		var jahr = parseInt(form.elements["jahr_inp"].value);
		if (jahr>100) {jahr=100};
		var zins = parseFloat(form.elements["zins_inp"].value)/100;
		var betrag = parseInt(form.elements["betr_inp"].value);
	var rate; //= parseInt(form.elements["rate_inp"].value);
	var operator = parseInt(form.elements["op"].value);
	switch(operator)
	{
		//monatl. Rate
		case 0:
		rate=parseFloat(form.elements["rate_inp"].value);
		break;
	  	//% Tilgung
	  	case 1: 
	  	rate= ((betrag*parseFloat(zins+(parseFloat(form.elements["rate_inp"].value)/100)))   /12) ;
	  	break;
	  	default:
	  	break;
	  }
	  var sondert = parseInt(form.elements["sond_inp"].value);


	  var jahr_name = "Jahr";
	  var rate_name = "monatl. Rate";
	  var sond_name = "Sondertilgung";
	  var rest_name = "Restschuld";


	  var month_zins;
	  var amount=betrag;
	  var paid=0;
	  var months_paid=0;
	  var years_paid=0;
	  for(var i=1; i < jahr+1; ++i) {
	  	months_paid=0;
	  	for(var month=1; month < 13; ++month) {
	  		month_zins = amount * zins / 12; 
	  		amount = amount + month_zins - rate; 
	  		paid += rate;
	  		months_paid ++;
	  		if (amount<0) {
	  			break;
	  		} 
	  	}	
	  	if (amount>0){
	  		amount-=sondert;
	  		paid += sondert;
	  	}
	  	years_paid++;


	  	var mmmm=paid;
	  	calc_details=calc_details + mmmm.toFixed(2) +"<br>";

	  	calc_det_Jahr = calc_det_Jahr + years_paid +"<br>";
	  	calc_det_mRate = calc_det_mRate + rate.toFixed(2)  +"<br>";
	  	calc_det_STlg =  calc_det_STlg + sondert.toFixed(2)+"<br>";
	  	var mm=amount;
	  	if (mm<0) mm=0;
	  	calc_det_Rest =  calc_det_Rest + mm.toFixed(2) +"<br>";

	  	if (amount<0) {
	  		amount=0;
	  		break;
	  	}
	  }



	  document.getElementById("amount_remaining_div").innerHTML =amount.toFixed(2);/*5 + 6;*/
	  document.getElementById("amount_paid_div").innerHTML =paid.toFixed(2);/*5 + 6;*/

	  if (showDetails) {
		//   \x22 is the escape character for "
		document.getElementById("details_cover").innerHTML = 
		" <div id=\x22details_div\x22> "
		+"<p> <div id=\x22j\x22 style=\x22clear: left\x22>" + calc_det_Jahr + "</div>"
		+ "<div id=\x22mR\x22>" + calc_det_mRate + "</div>"
		+ "<div id=\x22ST\x22>" + calc_det_STlg + "</div>"
		+ "<div id=\x22Re\x22>" + calc_det_Rest + "</div>"
		+ "<div style=\x22clear: left\x22> </div> </p>"
		+ "</div>";
	  } else {
		document.getElementById("details_cover").innerHTML = "";
	  }


}


/*recalculate();*/

