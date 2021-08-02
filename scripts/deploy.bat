del C:\inetpub\RegCovidApp\assets\*.* /S /Q
rd C:\inetpub\RegCovidApp\assets\ /S /Q
rd C:\inetpub\RegCovidApp\ /S /Q
mkdir C:\inetpub\RegCovidApp\
XCOPY dist\reg-covid-app C:\inetpub\RegCovidApp /S