import cubejs, { QueryType } from "@cubejs-client/core";

export enum CUBE_TYPE {
    SERVER = "SERVER",
    CLIENT = "CLIENT",
    PUBLIC = "PUBLIC",
}

const CUBE_BASE_URL = process.env.NEXT_PUBLIC_CUBE_BASE_URL!;
let cubePublicAuthToken = process.env.NEXT_PUBLIC_CUBE_PUBLIC_TOKEN || "";

const cubejsApiClient = cubejs("CUBEJS-API-TOKEN", {
    apiUrl: `/api/services/cube/cubejs-api/v1`,
});

const cubejsApiPublic = cubejs(cubePublicAuthToken, {
    apiUrl: `${CUBE_BASE_URL}/cubejs-api/v1`,
});

export async function getCubeData(
    query: any,
    options: {
        type: CUBE_TYPE;
        headerData?: { token: any };
    } = {
            type: CUBE_TYPE.CLIENT,
        }
) {
    console.log(options)
    let cubejsApi =
        options.type === CUBE_TYPE.CLIENT
            ? cubejsApiClient
            : options.type === CUBE_TYPE.SERVER
                ? cubejs(options.headerData?.token, {
                    apiUrl: `${CUBE_BASE_URL}/cubejs-api/v1`,
                })
                : cubejsApiPublic;

    try {
        const resultSet: any = await cubejsApi.load(query);
        return resultSet.loadResponse.results[0].data;
    } catch (error) {
        console.error(error);
    }
}


// {
//     measures: ["PyorProjectIdMapping.count"],
//     dimensions: ["PyorProjectIdMapping.symbol", "PyorProjectIdMapping.name"],
//     order: {
//         "PyorProjectIdMapping.count": "desc",
//     },
// }