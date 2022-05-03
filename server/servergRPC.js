var PROTO_PATH = './proto/demo.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var demo_proto = grpc.loadPackageDefinition(packageDefinition).demo;

const mysqlConnection = require('./index');
const HOST = process.env.SERVER_HOST;

function ListarInv(req,callback) {
  const q = req.request.name;
  console.log(q)
  if(q){
    const query = `SELECT * FROM items WHERE name LIKE '%${q}%';` ;
    mysqlConnection.query(query)
    .then((payload)=>{
      console.log(payload.rows.length);
      let arr = [];
      for(const data of payload.rows){
        //console.log(data);
        arr.push(data)
      }
      //console.log(arr)
      callback(null, { items: arr});
    });
  }else{
    const query = 'SELECT * FROM items';

    mysqlConnection.query(query)
    .then((payload)=>{
      console.log(payload.rows.length);
      let arr = [];
      for(const data of payload.rows){
        //console.log(data);
        arr.push(data);
      }
      //console.log(arr)
      callback(null, { items: arr});
    });
  }
}

function main() {
  var server = new grpc.Server();
  server.addService(demo_proto.ItemService.service, {
    ListarInv: ListarInv
  });
  server.bindAsync(`[::]:50051`, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('gRPC server on')
  });
}

main();