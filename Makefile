#Makefile

install: # Install ALL dependencies
	npm ci

publish:
	npm publish --dry-run

link: publish # Make the gendiff command available
	sudo npm link

setup: # Install dependencies and make the gendiff command available
	npm install --production
	npm link

lint: # Start eslint check
	npx eslint .

test: # Run all tests
	NODE_OPTIONS=--experimental-vm-modules npm test

testCoverage: # Check tests coverage
	NODE_OPTIONS=--experimental-vm-modules npm test -- --coverage 