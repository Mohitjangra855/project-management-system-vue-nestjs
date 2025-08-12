import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const isProduction = configService.get('NODE_ENV') === 'production';
    
    const store = await redisStore({
      socket: {
        host: configService.get('REDIS_HOST', 'localhost'),
        port: parseInt(configService.get('REDIS_PORT', '6379')),
        connectTimeout: 60000, // 60 seconds
        lazyConnect: true,
        keepAlive: 30000, // 30 seconds
        family: 4, // IPv4
      },
      password: configService.get('REDIS_PASSWORD'),
      database: parseInt(configService.get('REDIS_DB', '0')),
      retryDelayOnFailover: 100,
      retryDelayOnClusterDown: 300,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      // Enterprise features
      keyPrefix: configService.get('REDIS_KEY_PREFIX', 'pm_app:'),
      commandTimeout: 5000,
    });

    return {
      store: () => store,
      ttl: isProduction ? 600000 : 300000, // 10 min prod, 5 min dev
      max: isProduction ? 10000 : 1000, // More cache in production
      refreshThreshold: isProduction ? 360000 : 180000, // 6 min prod, 3 min dev
      // Enterprise error handling
      onClientError: (err) => {
        console.error('Redis Client Error:', err);
      },
    };
  },
  inject: [ConfigService],
};