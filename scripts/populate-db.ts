import { prisma } from './../src/external/prisma-client/client';
import { contextSchedule } from './../tests/utils/populateScheduleContext/context';




const dev = async ()=>{

    const pop = contextSchedule(prisma)


}

dev()