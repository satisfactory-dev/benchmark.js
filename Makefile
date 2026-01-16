.PHONY: test

VERSIONS = 6 8 10 11

nvm:
	. ${NVM_DIR}/nvm.sh && nvm $(CMD)

nvm--install:
	make nvm CMD="install $(VERSION)"

init:
	npm install
	for version in $(VERSIONS); do make nvm--install VERSION="$$version"; done

nvm--run: nvm--install
	make nvm CMD="run $(VERSION) $(CMD)"

test--all-versions:
	for version in $(VERSIONS); do make nvm--run VERSION="$$version" CMD="./test/test.js"; done

test:
	node ./test/test.js
