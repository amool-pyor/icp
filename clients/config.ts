interface ProjectType {
    [key: string]: {
        [key: string]: string;
    };
};

interface RTValueType {
    [key: string]: string[]
}

const Projects: ProjectType = {
    "Governance": {
        "xomae-vyaaa-aaaaq-aabhq-cai": "Boom DAO",
        "umz53-fiaaa-aaaaq-aabmq-cai": "Cataylyze",
        "zqfso-syaaa-aaaaq-aaafq-cai": "Dragginz",
        "tr3th-kiaaa-aaaaq-aab6q-cai": "Gold DAO",
        "6wcax-haaaa-aaaaq-aaava-cai": "Hot or Not",
        "4l7o7-uiaaa-aaaaq-aaa2q-cai": "IC Ghost",
        "rceqh-cqaaa-aaaaq-aabqa-cai": "ICX Governance",
        "74ncn-fqaaa-aaaaq-aaasa-cai": "Kinic",
        "xvj4b-paaaa-aaaaq-aabfa-cai": "Modclub",
        "eqsml-lyaaa-aaaaq-aacdq-cai": "Neutrinite",
        "rqch6-oaaaa-aaaaq-aabta-cai": "Nuance",
        "2jvtu-yqaaa-aaaaq-aaama-cai": "Openchat",
        "qgj7v-3qaaa-aaaaq-aabwa-cai": "Sonic",
        "elxqo-raaaa-aaaaq-aacba-cai": "Trax"
    },
    "Ledger": {
        "Boom DAO": "vtrom-gqaaa-aaaaq-aabia-cai",
        "Cataylyze": "uf2wh-taaaa-aaaaq-aabna-cai",
        "Dragginz": "zfcdd-tqaaa-aaaaq-aaaga-cai",
        "Gold DAO": "tyyy3-4aaaa-aaaaq-aab7a-cai",
        "Hot or Not": "6rdgd-kyaaa-aaaaq-aaavq-cai",
        "IC Ghost": "4c4fd-caaaa-aaaaq-aaa3a-cai",
        "ICX Governance": "rffwt-piaaa-aaaaq-aabqq-cai",
        "Kinic": "73mez-iiaaa-aaaaq-aaasq-cai",
        "Modclub": "xsi2v-cyaaa-aaaaq-aabfq-cai",
        "Neutrinite": "f54if-eqaaa-aaaaq-aacea-cai",
        "Nuance": "rxdbk-dyaaa-aaaaq-aabtq-cai",
        "Openchat": "2ouva-viaaa-aaaaq-aaamq-cai",
        "Sonic": "qbizb-wiaaa-aaaaq-aabwq-cai",
        "Trax": "emww2-4yaaa-aaaaq-aacbq-cai",
    }
}

const R_t_vlaue: RTValueType = {
    "0": ["5.00", "1000"],
    "1": ["3.74", "1050"],
    "2": ["2.76", "1089"],
    "3": ["2.06", "1119"],
    "4": ["1.64", "1142"],
    "5": ["1.50", "1161"],
    "6": ["1.50", "1179"],
    "7": ["1.50", "1196"],
    "8": ["1.50", "1214"],
    "9": ["1.50", "1232"],
    "10": ["1.50", "1251"],
    "11": ["1.50", "1270"],
    "12": ["1.50", "1289"],
    "13": ["1.50", "1308"],
    "14": ["1.50", "1328"],
    "15": ["1.50", "1348"],
    "16": ["1.50", "1368"],
    "17": ["1.50", "1388"],
    "18": ["1.50", "1409"],
    "19": ["1.50", "1430"],
    "20": ["1.50", "1452"],
}


export { Projects, R_t_vlaue }