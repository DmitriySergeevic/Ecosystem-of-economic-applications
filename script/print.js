let print_btn = document.getElementById('print-btn')

function CallPrint(strid) {
    let prtContent = document.getElementById(strid);
    let prtCSS = '<link rel="stylesheet" href="/templates/css/template.css" type="text/css" />';
    let WinPrint = window.open('', '', 'left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');
    WinPrint.document.write('<div id="account" class="account">');
    WinPrint.document.write(prtCSS);
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.write('</div>');
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
    prtContent.innerHTML = strOldOne;
}

print_btn.onclick = function () {
    CallPrint('print-content')
}