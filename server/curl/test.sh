# configs
URL=$1; echo URL $URL;
CURL_DIR=$2; echo CURL_DIR $CURL_DIR;
CURL_BEGIN="curl -s -o .out -w "%{http_code}" ${URL}";
NC='\033[0m ';
RED='\033[0;31m ';
GREEN='\033[0;32m ';
# endpoint variables
USER=5e5d16e079390d326a9fdaac;
# json blobs
USER_JSON=$CURL_DIR"u.json",
VACCINE_JSON=$CURL_DIR"v.json",
DEMOGRAPHIC_JSON=$CURL_DIR"d.json";
LOGIN_JSON=$CURL_DIR"l.json",
# test declarations
declare -a tests=(
    # /demographic
    "0;200;GET/demographic/${USER};/demographic/${USER}"
    "1;200;POST/demographic/${USER};/demographic/${USER} -X POST -d @${DEMOGRAPHIC_JSON}"
    # /user
    "2;200;GET/user/${USER};/user/${USER}"
    "3;200;POST/user;/user -X POST -d @${USER_JSON}"
    # /login
    #";200;POST/login;/login -X POST -H 'Content-Type: application/json' -d @${LOGIN_JSON}"
);
# run tests halt for user input before running again
mode=1;
while [ "${mode}" -ne "-1" ];do
    if [ "${mode}" -eq "0" ];then
        for t in "${tests[@]}"
        do
            IFS=';' read -ra TEST <<< "$t";
            INDEX=$((${TEST[0]}+0));
            HTTP_CODE=$(${CURL_BEGIN}${TEST[3]});
            MESSAGE="${TEST[2]}";
            
            if [ "${HTTP_CODE}" -ne "${TEST[1]}" ];then
                COLOR=$RED;
            else
                COLOR=$GREEN;
            fi

            echo -e $INDEX $COLOR$HTTP_CODE$NC $MESSAGE;
        done
    elif [ "${mode}" -eq "1" ];then
        echo "exit with -1. Select mode with index [test-all, help, test-index]";
    elif [ "${mode}" -eq "2" ];then
        INDEX=-2;
        while [ "${INDEX}" -ne "-1" ];do
            read INDEX;
            IFS=';' read -ra TEST <<< "${tests[INDEX]}";
            INDEX=$((${TEST[0]}+0));
            HTTP_CODE=$(${CURL_BEGIN}${TEST[3]});
            MESSAGE="${TEST[2]}";
            
            if [ "${HTTP_CODE}" -ne "${TEST[1]}" ];then
                COLOR=$RED;
            else
                COLOR=$GREEN;
            fi

            echo -e $INDEX $COLOR$HTTP_CODE$NC $MESSAGE;

            cat .out;
            echo;
        done
    else
        echo Bad Command;
        mode=1;
    fi
    read mode;
done
