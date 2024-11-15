import { ConfigModule, ConfigService } from '@nestjs/config';

export const MongoConfigAsync = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_CONNECTION'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }),
    inject: [ConfigService],
};
