import requests


class MpesaClient:

    @staticmethod
    def get(url, headers=None, params=None):
        response = requests.get(
            url,
            headers=headers,
            params=params,
            timeout=30,
        )

        response.raise_for_status()

        return response.json()

    @staticmethod
    def post(url, headers=None, json=None):

        response = requests.post(
            url,
            headers=headers,
            json=json,
            timeout=30,
        )

        response.raise_for_status()

        return response.json()
