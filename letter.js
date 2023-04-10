document.getElementById("letter-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
	const from = document.getElementById("from").value;
    const message = document.getElementById("message").value;
    const includeDate = document.getElementById("include-date").checked;

    let letterContent = "";
    if (includeDate) {
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        letterContent += dateString;
    } 
	
	letterContent += "\n\n";

    letterContent += "Dear " +name + ",\n\n";
    letterContent += message;
	letterContent += "\n\nSincerely,\n";
	letterContent += from;

    document.getElementById("letter-preview").innerText = letterContent;
});

function downloadPDF() {
	// Create PDF object
	const pdf =  new jsPDF("p", "mm", "a4");
	
    const letterPreview = document.getElementById("letter-preview");
    html2canvas(letterPreview, 
		{ scale: 4, 
		  quality: 4, 
		  width: letterPreview.clientWidth, 
		  height: letterPreview.clientHeight}).then((canvas) => {
        const imgData = canvas.toDataURL("image/png",1.0 );
		const imgWidth = 210 - 30; // A4 width (210mm) - 20mm margins
		const imgHeight = (imgWidth * canvas.height) / canvas.width;
        pdf.addImage(imgData, "PNG", 20, 10, imgWidth, imgHeight);
        pdf.save("letter.pdf");
    });
}


