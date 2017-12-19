DIR="$( cd "$( dirname "${BASH_SOURCE[0]}"  )" && pwd  )"
IMPRESS_MODE=test node --stack-trace-limit=1000 $DIR/integration.js
