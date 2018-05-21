function reactappinit() {
	local NEWPROJECT
	echo " (*) Installing create-react-app [sudo npm install -g create-react-app]"
	sudo npm install -g create-react-app
	read -p " (*) Specify the name of the new project: " NEWPROJECT
	echo " (*) Creating new project $NEWPROJECT [create-react-app $NEWPROJECT]"
	create-react-app $NEWPROJECT
	echo " (*) Installing Redux framework [cd $NEWPROJECT && npm install -s redux]"
	cd $NEWPROJECT && npm install -s redux
	echo " (*) Redux was installed successfully!"
	echo " (*) Starting the application for development [npm start]"
	npm start
}
alias reactappinit="reactappinit"