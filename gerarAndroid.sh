#!/bin/bash
caminho="$PWD/platforms/android/build/outputs/apk"
echo "$caminho"
cordova build --release android &&
rm -fr $caminho/Agenda.apk &&
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $caminho/agenda.keystore $caminho/android-release-unsigned.apk agenda &&
zipalign -v 4 $caminho/android-release-unsigned.apk $caminho/Agenda.apk
echo "APK pronto para Produção =)"
