var FrontEndJS = {
    trainingSelected: [],
    is_replay: false,

    playQuestion : function () {
        var count = new Date().getTime() + (3*1000);
        $('#start-show').countdown(count, function(event){
            $(this).html(event.strftime(
                '<span style="color: #19264B; font-weight: 700; font-size: 54px">%S</span>'));
        }).on('finish.countdown', function(event) {
            $('div#start-show').css({display:"none"});
            if(FrontEndJS.is_replay){
                FrontEndJS.showFlashText(true);
            }else {
                FrontEndJS.showFlashText(false);
            }
            setTimeout(function(){
                $("#flash_text").css({"display": "none"});
                $('div.intro').css({"display": "table-cell"});
            }, 1000);
        });
    },

    /*
     * @Desc   : show flash text circle, ngang, doc
     */
    showFlashText : function (is_replay){
        var question_type = localStorage.getItem('question_type');
        var list_question = localStorage.getItem('list_question');
        var obj_list_question = JSON.parse(list_question);
        if(localStorage.getItem('question_type') == 1){
            $("#flash_text").css({"display": "table-cell", "vertical-align": "middle", "text-align": "center"});
        }else {
            $("#flash_text").css({"display": "table-cell", "vertical-align": "middle", "text-align": "center"});
        }
        
        if(!is_replay){
            var question = obj_list_question[Math.floor(Math.random()*obj_list_question.length)];
            localStorage.setItem('current_question', question.content);
        }
        if (is_replay){
            if (question_type == 1){
                FrontEndJS.drawCircleText("question-display", 300, 290, localStorage.getItem('current_question'), 110);
            }else {
                if (localStorage.getItem('flash_sentence') == 2){
                    if (localStorage.getItem('sentence_row') == 2){
                        FrontEndJS.showQuestionHorizontal(localStorage.getItem('current_question'),2,'flash_text');
                    }else {
                        FrontEndJS.showQuestionHorizontal(localStorage.getItem('current_question'),1,'flash_text');
                    }
                }else {
                    if (localStorage.getItem('sentence_row') == 2){
                        FrontEndJS.showQuestionVertical(localStorage.getItem('current_question'),2,'flash_text');
                    }else {
                        FrontEndJS.showQuestionVertical(localStorage.getItem('current_question'),1,'flash_text');
                    }
                }
            }
        }else {
            if (question_type == 1){
                FrontEndJS.drawCircleText("question-display", 300, 290, question.content, 110);
            }else {
                if (localStorage.getItem('flash_sentence') == 2){
                    if (localStorage.getItem('sentence_row') == 2){
                        FrontEndJS.showQuestionHorizontal(question.content,2,'flash_text');
                    }else {
                        FrontEndJS.showQuestionHorizontal(question.content,1,'flash_text');
                    }
                }else {
                    if (localStorage.getItem('sentence_row') == 2){
                        FrontEndJS.showQuestionVertical(question.content,2,'flash_text');
                    }else {
                        FrontEndJS.showQuestionVertical(question.content,1,'flash_text');
                    }
                }
            }
        }
    },
    
    /*
     * @Desc   : draw text type circle
     */
    drawCircleText : function (id, mx, my, stingText, radiusShow){
        function Char(ctx, ch) {
            this.char = ch;                    // current char
            this.width = ctx.measureText('W').width;  // width of char or widest char
            this.x = 0;                        // logistics
            this.y = 0;
        }
        function randomString(strContent) {
            var length = strContent.length;
            var strResult = "";
            for (var index = 0; index < length; index++) {
                var postion = Math.floor(Math.random() * strContent.length);
                var strSub = "";
                strSub = strContent[postion];
                var strSubNext = strContent[postion + 1];
                var strSubPre = strContent[postion - 1];
                if (strSub == "。"||strSub == "、") {
                    strSub = strSubPre + strSub;
                    strContent = strContent.substring(0, postion - 1) + strContent.substring(postion + 1, strContent.length);
                    length--;
                } else if (strSubNext == "。"||strSubNext == "、") {
                    length--;
                    strSub += strSubNext;
                    strContent = strContent.substring(0, postion) + strContent.substring(postion + 2, strContent.length);
                } else {
                    strContent = strContent.substring(0, postion) + strContent.substring(postion + 1, strContent.length);
                }
                if (strSub != undefined)
                    strResult = strResult + "" + strSub;
            }
            return strResult;
        }

        function Text(ctx, cx, cy, txt, font, radius) {

            this.radius = radius;               // expose so we can alter it live

            ctx.textBaseline = 'bottom';        // use base of char for rotation
            ctx.textAlign = 'center';           // center char around pivot
            ctx.font = font;

            var charsSplit = txt.split(''), // split string to chars
                lentxt = charsSplit.length,
                chars = [], // holds Char objects (see below)
                scale = 0.028, // scales the space between the chars
                step = 0.0, // speed in steps
                i = 0, ch;
            var tam = txt.split("。");
            var tu = txt.split("、");
            if (tam.length > 1 || tu.length > 1) {
                lentxt--;
            }
            scale = 0.209 / lentxt;

            for (; ch = charsSplit[i++]; )       // create Char objects for each char
                chars.push(new Char(ctx, ch));

            // render the chars
            this.render = function() {

                var i = 0, ch, w = 0;

                ctx.translate(cx, cy);         // rotate the canvas creates the movement
                ctx.rotate(-step);
                ctx.translate(-cx, -cy);

                for (; ch = chars[i++]; ) {      // calc each char's position
                    ch.x = cx + this.radius * Math.cos(w);
                    ch.y = cy + this.radius * Math.sin(w);
                    var chNext = chars[i];
                    if (chNext != undefined && (chNext.char == "。" ||chNext.char == "、")) {
                        ch.x += ch.width/3;
                        ch.char += chNext.char;
                        i++;
                    }
                    ctx.save();                // locally rotate the char
                    ctx.translate(ch.x, ch.y);
//                        ctx.rotate(w + 0.5 * Math.PI);
                    ctx.translate(-ch.x, -ch.y);
                    ctx.fillText(ch.char, ch.x, ch.y);
                    ctx.restore();

                    w += 30.5 * scale;
                }
            };
        }
        var ctx = document.getElementById(id).getContext('2d');
        var strShow = randomString(stingText);
        var hei = $(window).height();
        if (hei < 550){
            var fontside = '80px MS Mincho, TakaoMincho';
        }else {
            var fontside = '90px MS Mincho, TakaoMincho';
            if(radiusShow <= 100) {
                fontside = '70px MS Mincho, TakaoMincho';
            }
        }
        var text = new Text(ctx, mx, my, strShow, fontside, radiusShow);

        ctx.clearRect(0, 0, 550, 800);
        text.render();
    },

    showQuestionHorizontal : function (strContent,typeRow,idElement, isResult) {
        var htmlFlash = "<div id='show_in_row' class='show-question-rows' style='margin-left: 550px; font-weight: bold; font-size: 18px'>" + "<table>";

        if (typeRow == 1) {
            var part = strContent.split('<br/>');
            htmlFlash += "<tr><td><div class='show-question-one-rows'>" + part + "</div></td></tr>";
        } else if (typeRow == 2) {
            var part1 = strContent.split('<br />');
            for (var i = 0; i < part1.length; i++) {
                htmlFlash += "<tr><td><div class='show-question-two-rows' style=''>" + part1[i] + "</div></td></tr>";
            }
        }
        htmlFlash += "<div class='clearfix'></div>";
        htmlFlash += "</table></div>";
        $('#' + idElement).html(htmlFlash);
    },

    showQuestionVertical : function (strContent,typeColumns,idElement, isResult) {
        var htmlFlash = "<div class='show-question-column' id='show-flash-question' style='margin-left: 550px' >";
   
        htmlFlash+="<table>";
        if (typeColumns == 1) {
            var part = strContent.split('<br/>');
            htmlFlash += "<tr><td><div id='one_column' class='show-question-two-columns one-column'>" + part + "</div></td></tr>";
        }else {
            var part1 = strContent.split('<br/>');
            var height = [];
            for (var i = 0; i < part1.length; i++) {
                htmlFlash += "<tr><td style='vertical-align: top'><div>" + part1[i] + "</div></td></tr>";
            }
        }
        htmlFlash +="</table>";
        htmlFlash += "</div>";
        $('#'+idElement).html(htmlFlash);
    }
};