# coastwards.org
--
### Localhost
npm run start --> 127.0.0.1:8888

### Office
npm run start office --> 134.245.149.30:8888

----
## Scripts

### Setup
	$ ./scripts/mysql/setup.sh <environment>

initial setup for mysql implementation. 
uses credentials set in ./config/\<environment\>.json and creates the mysql user if necessary
creates database schema accordingly

executes ./coastwards_contributions.sql with credentials

##### environment
one of <b>development</b>, <b>stage</b> or <b>production (default)</b>


### Deployment
	$ ./scripts/mysql/deploy.sh

automated deployment process. credentials require configuration according to deployment target in <i>./scripts/deploy/credentials.inc</i>

installs public key on remote machine and executes rsync for updating remote sources

!Needs additional scripts to (re)launch server!

### NVM

if node was installed through nvm run:

	n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share}