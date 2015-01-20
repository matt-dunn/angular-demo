module.exports = {
    request: {
        path: '/service/widgets/widgets.json',
        method: 'GET'
    },
    response: {
        "status": 200,
        "data":{
            "available": [
                {
                    "type": "Test.Component.1",
                    "title": "Test Component 1",
                    "description": "Test component 1 description"
                },
                {
                    "type": "Test.Component.2",
                    "title": "Test Component 2",
                    "description": "Test component 2 description"
                }
            ],
            "sections": {
                "left": {
                    "installed": [
                    ]
                },
                "middle": {
                    "installed": [
                    ]
                },
                "middle-bottom": {
                    "installed": [
                    ]
                },
                "right": {
                    "installed": [
                    ]
                }
            }
        }
    }
};

