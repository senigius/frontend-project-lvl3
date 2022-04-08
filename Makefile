install:
		npm ci
		sudo npm link

test:
		NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
		NODE_OPTIONS=--experimental-vm-modules npm test -- --coverage --coverageProvider=v8

lint:
		npx eslint .

open:
		vercel dev