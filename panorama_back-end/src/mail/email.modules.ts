import { Global, Module } from "@nestjs/common";
import { EmailService } from "./services/email.service";

@Global()
@Module({
    imports:[],
    providers:[EmailService],
    controllers:[],
    exports:[]
})
export class EmailModule {}