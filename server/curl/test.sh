# configs
URL="http://localhost:3001"; echo URL $URL;
CURL_BEGIN="curl -s -o .out -w "%{http_code}" ${URL}";
CURL_DIR="./curl/";
# endpoint variables
USER=5e5d16e079390d326a9fdaac;
# json blobs
DEMOGRAPHIC_JSON=$CURL_DIR"./d.json";
# setup tests format index;curl_cmd;output_msg
declare -a tests=(
    "0;/demographic/${USER};GET/demographic/${USER}"
    "1;/demographic/${USER} -X POST -d @${DEMOGRAPHIC_JSON};POST/demographic/${USER}"
    "2;/user/${USER};GET/user/${USER}"
);

mode=2;
while [ "${mode}" -ne "0" ]
do
    if [ "${mode}" -eq "1" ];then
        echo;
        for i in "${tests[@]}"
        do
            IFS=';' read -ra TEST <<< "$i";    
            INDEX=$((${TEST[0]}+0));
            HTTP_CODE=$(${CURL_BEGIN}${TEST[1]});
            MESSAGE="${TEST[2]}";
            
            echo $INDEX $HTTP_CODE $MESSAGE;
        done
        echo;
    elif [ "${mode}" -eq "2" ];then
        echo 'select mode with index [exit, test-all, help, test-index]';
    elif [ "${mode}" -eq "3" ];then
        read INDEX;
        IFS=';' read -ra TEST <<< "${tests[INDEX]}";
        INDEX=$((${TEST[0]}+0));
        HTTP_CODE=$(${CURL_BEGIN}${TEST[1]});
        MESSAGE="${TEST[2]}";
        echo $HTTP_CODE $MESSAGE;
        cat .out;
        echo;
    else
        echo Bad Command;
        mode=2;
    fi
    read mode;
done