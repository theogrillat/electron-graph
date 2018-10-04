#!/bin/bash
clear

# test

COLUMNS=$(tput cols)

start=0


startq="Is it your first test ?"
quest="What number is your last test ?"
titreq="How many speedtests do you want to do ?"

echo
echo
printf "\x1B[33m%*s\n\x1B[0m" $(((${#quest}+$COLUMNS)/2)) "$startq"
echo
read first


if [ "$first" -eq "no" ]
then
    echo
    echo
    printf "\x1B[33m%*s\n\x1B[0m" $(((${#quest}+$COLUMNS)/2)) "$quest"
    echo
    read start
else
    rm data/test.csv
    touch data/test.csv
fi




echo
echo
printf "\x1B[33m%*s\n\x1B[0m" $(((${#titreq}+$COLUMNS)/2)) "$titreq"
echo
read instans





counter=$(expr $start + 1)

stop=$(expr $start + $instans)

header=`speedtest --csv-header`
plus='test number,'
headerconc=$plus$header

if [ $start -eq 0 ]
then
    echo $headerconc >> data/test.csv
fi

while [ $counter -le $stop ]
do 
    titre="SPEEDTEST n°$counter"
    large="$(((${#titre}+$COLUMNS)/2))"
    echo
    echo
    printf '\x1B[33m%*s\n\x1B[0m' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
    echo
    printf "\x1B[33m%*s\n\x1B[0m" $large "$titre"
    echo
    printf '\x1B[33m%*s\n\x1B[0m' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
    echo
    echo
    echo -e "\e[31mLoading ...\e[0m"
    testData=`speedtest --csv`
    testDataCount="$counter,"
    testConc=$testDataCount$testData
    echo $testConc >> data/test.csv
    echo -e "\e[32mDONE\e[0m"
    echo
    ((counter++))
done

echo FINI

