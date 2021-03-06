jQuery(function($) {

    function htmlEscape(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    var indent = "    ";

    function doIndent(text, indentNumber) {
        var result = "";
        var splitted = text.split(/\r?\n/);
        for (var i = 0; i < splitted.length ;i++) {
            if (splitted[i] !== "") {

                // At indent
                for (var x = 0; x < indentNumber; x++) {
                    result += indent;
                }

                result += splitted[i];
            }
            result += "\n";
        }
        return result;
    }

    function createAttribute(dialog, name, idPart) {
        var value = $.trim(dialog.find("#datacamp-" + idPart).val());
        if (!value)
            return "";
        return ' ' + name + '="' + value + '"';
    }

    function processAddDataCampExerciseForm(dialog) {
        var pec = dialog.find("#datacamp-pre-exercise-code").val();
        var sampleCode = dialog.find("#datacamp-sample-code").val();
        var solution = dialog.find("#datacamp-solution").val();
        var sct = dialog.find("#datacamp-sct").val();
        var hint = dialog.find("#datacamp-hint").val();

        var output = '[datacamp_exercise';
        output += createAttribute(dialog, "lang", "programming-language");
        output += createAttribute(dialog, "height", "height");
        output += createAttribute(dialog, "min-height", "min-height");
        output += createAttribute(dialog, "max-height", "max-height");
        output += ']\n';

        output += indent + "[datacamp_pre_exercise_code]\n";
        output += doIndent(pec, 2);
        output += indent + "[/datacamp_pre_exercise_code]\n";

        output += indent + "[datacamp_sample_code]\n";
        output += doIndent(sampleCode, 2);
        output += indent + "[/datacamp_sample_code]\n";

        output += indent + "[datacamp_solution]\n";
        output += doIndent(solution, 2);
        output += indent + "[/datacamp_solution]\n";

        output += indent + "[datacamp_sct]\n";
        output += doIndent(sct, 2);
        output += indent + "[/datacamp_sct]\n";

        output += indent + "[datacamp_hint]\n";
        output += doIndent(hint, 2);
        output += indent + "[/datacamp_hint]\n";

        output += '[/datacamp_exercise]';
        window.send_to_editor(htmlEscape(output));
    }

    $(document).ready(function(){
        var dialog = $("#datacamp-media-button-popup").dialog({
            autoOpen: false,
            minHeight: 400,
            minWidth: 600,
            height: $(window).height() * 0.9,
            width: $(window).width() * 0.6,
            modal: true,
            buttons: [
                {
                    text : "Insert Exercise",
                    class : "button button-primary",
                    click : function () {
                        processAddDataCampExerciseForm($(this));
                        $(this).dialog("close");
                    }
                },
                {
                    text : "Reset Fields",
                    class : "button",
                    click : function () {
                        $(this).find("form").get(0).reset();
                    }
                },
                {
                    text : "Cancel",
                    class : "button",
                    click : function () {
                        $(this).dialog("close");
                    }
                }
            ],
            close: function() {
                //form[ 0 ].reset();
                //allFields.removeClass( "ui-state-error" );
            }
        });

        $("#insert-datacamp-exercise-button").on("click", function(e) {
            dialog.dialog("open");
            e.preventDefault();
        });
    });
});