# freeboard-elasticsearch
Example [Freeboard](https://github.com/Freeboard/freeboard) dashboards for [Elasticsearch](https://github.com/elastic/elasticsearch)

## Example

<pre>
freeboard.initialize(true);
  $.getJSON('path/to/freeboard.config.json', function(data) {
    freeboard.loadDashboard(data, function() {
      freeboard.setEditing(true);
    });
  });
</pre>
