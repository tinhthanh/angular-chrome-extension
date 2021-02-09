// MAIN
var STORE_USERNAME = 'STORE_USERNAME';
var STORE_PASSWORD = 'STORE_PASSWORD';
var userName =  localStorage.getItem(STORE_USERNAME)  || "";
var password = localStorage.getItem(STORE_PASSWORD) || "" ;
$(document).ready(function () {
    if(userName !== '' && password !== '') { 
        renderStop();
     }
    if(window.location.href.indexOf("dkmh.hcmuaf.edu.vn") === -1 ) {
        return;
    } 
   console.log("run code");
    
    var timer  ;
    var counter  = 0;
    
        // await search 1s 
        // 2s save 
        // total = 3s
        var total =  3000 ;
        var awaitSearch = 1000;
        var awaitSave = 2000;
       

     if($("#ctl00_Header1_ucLogout_lblNguoiDung")) {
        $("#ctl00_Header1_ucLogout_lblNguoiDung").hide();
     }
    $(document).click(function (event) {
        if ($(event.target).parents("#pnlDSMonhocDK").length > 0 && $(event.target).parent().find("input").val() && $(event.target).parent().find("input").attr('type') === 'checkbox') {
            $(event.target).parent().css({ "color": "red", "border": "2px solid red" });
            console.log($(event.target).parent().find("input").val());
            sessionStorage.setItem('mmh', btoa(encodeURIComponent($(event.target).parent().find("input").val())));
            document.getElementById("noni_loading").innerHTML = "Đăng ký môn :"  +$(event.target).parent().find("input").val().split("|")[2] +   " <button  onclick='location.reload();' > Start (Quất)  </button> ";
        }
    });
    if ($("#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_btnDangNhap").val()
        || $("#ctl00_ContentPlaceHolder1_ctl00_btnDangNhap").val()) {
            if(userName === '' || password === '') {
                // window.location.href = 'https://dkmh.hcmuaf.edu.vn';
                renderSetting();
            } else {
                $("#ctl00_ContentPlaceHolder1_ctl00_txtTaiKhoa").val(userName) ; 
                $("#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_txtTaiKhoa").val(userName);
               
                $("#ctl00_ContentPlaceHolder1_ctl00_txtMatKhau").val(password);
                $("#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_txtMatKhau").val(password); 
     
                 setTimeout( function() { 
                     $("#ctl00_ContentPlaceHolder1_ctl00_btnDangNhap").val() &&  $("#ctl00_ContentPlaceHolder1_ctl00_btnDangNhap").click();
                     $("#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_btnDangNhap").val() && $("#ctl00_ContentPlaceHolder1_ctl00_ucDangNhap_btnDangNhap").click();
                 } , 3000)
                 setInterval(function () {
                     botSpeak('Please log in');
                 }, 3000);
            }
    } else {
        setTimeout( function() {
            if (!window.location.href.endsWith("dkmonhoc")) {
                if(userName !== '' && password !== '') {
                    window.location.href = 'https://dkmh.hcmuaf.edu.vn/Default.aspx?page=dkmonhoc'
                }
            } else {
                var loading = document.createElement("div");
                loading.setAttribute("id", "noni_loading");
                loading.setAttribute("style", "position: fixed; background: rgba(255,255,255,0.8); top: 0; left: 0; width: 100%; font-size: 24px; z-index: 1000; padding: 12px;");
                document.body.appendChild(loading);
                document.getElementById("noni_loading").innerHTML = "Loading ...";
              
                if($("#ctl00_ContentPlaceHolder1_ctl00_txtCaptcha").length === 1) {
                    $("#ctl00_ContentPlaceHolder1_ctl00_txtCaptcha").val($("#ctl00_ContentPlaceHolder1_ctl00_lblCapcha").text());
                    document.getElementById("noni_loading").innerHTML = "Vui nhập capcha";
                    setTimeout( function() {
                        $('#ctl00_ContentPlaceHolder1_ctl00_btnXacNhan').click();
                    } , 1000 );
                }
                if (sessionStorage.getItem('mmh')) {
                     timer = setTimeout(function myTimer() {
                        var m = decodeURIComponent(atob(sessionStorage.getItem('mmh')));
                        var mmh = decodeURIComponent(atob(sessionStorage.getItem('mmh'))).split("|")[0].split(" ")[0].trim();
                        mmh = mmh.substring(0, mmh.length - 2);
                        document.getElementById("noni_loading").innerHTML = "Kiểm tra : " + mmh + " Môn học : " +  m.split("|")[2] ;
                        console.log(m)
                        $("#txtMaMH1").val(mmh);
                        $("#btnLocTheoMaMH1").css({ "color": "red", "border": "2px solid red" });
                        $("#btnLocTheoMaMH1").click();
                        // await result 
                       setTimeout(r => {
                            var flat = false;
                            //
                            if($("#divTDK").find("table").length === 0 ) {
                                    counter++;
                                    if(counter === 5) {
                                        location.reload();
                                    }
                            } 
                            //
                            for (var i = 0; i < $("#divTDK").find("table").length; i++) {
                                var div = ($("#divTDK").find("table")[i]);
                                if (div) {
                                    var score = div.childNodes[1].childNodes[0].childNodes[1].childNodes[0];
                                    if (score.getAttribute('value') === m) {
                                         if(score.getAttribute('checked') !== null ) {
                                            document.getElementById("noni_loading").innerHTML =  "Đăng ký Thành công !";
                                            sessionStorage.removeItem("mmh");
                                            setTimeout( function( ) {
                                                location.reload();
                                            } , 3000 )
                                            break;
                                         } else {
                                            if (score.getAttribute('disabled') === null) {
                                                flat = true;
                                                 score.click();
                                            } else {
                                                div.childNodes[1].childNodes[0].setAttribute("style", " color: white; background: linear-gradient(45deg, #E2E734 0%, #35C9FF 100%); border-radius: 8px;");
                                            }
                                         }
                                    } else {
                                        div.childNodes[1].childNodes[0].setAttribute("style", " color: white;background: repeating-linear-gradient(45deg, #606dbc, #606dbc 10px, #465298 10px, #465298 20px);");
                                    }
                                }
                            }
                            if (!flat) {
                                //  setTimeout(function(){   location.reload() }, 3000);
                            } else {
                                setTimeout(function(){   $("#btnLuu").click() }, awaitSave);
                                botSpeak("Good good good good")
                                //   alert( $("#btnLuu").attr('id'));
                            }
                            timer = setTimeout(myTimer, total);
                        }, awaitSearch)
                    }, total);
                } else {
                    document.getElementById("noni_loading").innerHTML = "Vui lòng chọn một môn học..";
                    if($("#ctl00_ContentPlaceHolder1_ctl00_txtCaptcha").length === 1) {
                        $("#ctl00_ContentPlaceHolder1_ctl00_txtCaptcha").val($("#ctl00_ContentPlaceHolder1_ctl00_lblCapcha").text());
                        document.getElementById("noni_loading").innerHTML = "Vui nhập capcha";
                        setTimeout( function() {
                            $('#ctl00_ContentPlaceHolder1_ctl00_btnXacNhan').click();
                        } , 1000 );
                    }
                }
            }
        } , 2000);
       
    }
});

function botSpeak(text) {
    if ('speechSynthesis' in window) {
        var msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
    }
}
function renderStop() { 
    var container = document.createElement("div");
    container.setAttribute("id", "idStop");
    container.setAttribute("style",`    
    position: fixed;
    bottom: 0;
    left: 0;
    width: 300px;
    font-size: 24px;
    z-index: 1000;
    padding: 12px;
    justify-content: center;
    align-items: center;
    display: flex;`);
    var submitf = document.createElement("div");
    submitf.setAttribute("style", 
    `font-family: cursive;
     width: 200px;
     height: 35px;
     line-height: 35px;
     margin: 15px auto;
     border-radius: 4px;
     cursor: pointer;
     background: linear-gradient(45deg, #E2E734 0%, #35C9FF 100%);
     text-align: center;
     padding: 2px;
     color: #f2f9ff;
     user-select: none;`);
    submitf.innerHTML = "Stop";
    submitf.addEventListener("click" , function() {
        localStorage.clear();
        sessionStorage.clear();
        setTimeout(() =>  location.reload() , 1000);
    });

    container.append(submitf);
    document.body.appendChild(container);
}
function renderSetting() {
    console.log("Render Setting");
    var container = document.createElement("div");
    container.setAttribute("id", "idSetting");
    container.setAttribute("style", "position: fixed; background: rgba(255,255,255,0.8); bottom: 0; left: 0; width: 100%; font-size: 24px; z-index: 1000; padding: 12px;");
   
    var userNamef = document.createElement("input");
    userNamef.value =  userName;
    userNamef.setAttribute("style" , `    border-radius: 8px;
    border: 1px solid #b0c5ff;
    padding: 6px;
    display: flex;
    margin: 0 auto;
    width: 220px;
    margin-bottom: 20px;`);

    var passwordf = document.createElement("input");
    passwordf.value  = password;

    passwordf.setAttribute("style" , `    border-radius: 8px;
    border: 1px solid #b0c5ff;
    padding: 6px;
    display: flex;
    margin: 0 auto;
    width: 220px;`);
    var submitf = document.createElement("div");
    submitf.setAttribute("style", 
                       `font-family: cursive;
                        width: 200px;
                        height: 35px;
                        line-height: 35px;
                        margin: 15px auto;
                        border-radius: 4px;
                        cursor: pointer;
                        background: linear-gradient(45deg, #E2E734 0%, #35C9FF 100%);
                        text-align: center;
                        padding: 2px;
                        color: #f2f9ff;
                        user-select: none;`);
    submitf.innerHTML = "Auto Đăng nhập";
    submitf.addEventListener("click" , function() {
        console.log("dang nahp" + userNamef.value);
        if(userNamef.value === '' || passwordf.value === '') {
            alert("Username or password is not empty!");
            return;
        }
        localStorage.setItem(STORE_USERNAME, userNamef.value );
        localStorage.setItem(STORE_PASSWORD, passwordf.value);
        setTimeout(() =>  location.reload() , 1000);

    });

    container.append(userNamef);
    container.append(passwordf);
    container.append(submitf);


    document.body.appendChild(container);
}

// await search 1s 
// 2s save 
// total = 3s

// var timer ; timer = setTimeout(function my() { console.log("search -> ....."); setTimeout( r=> { console.log("1s..check");  timer = setTimeout(my, 3000);  setTimeout(function(){   console.log("2s--save"); }, 2000); }, 1000);  } ,3000 );