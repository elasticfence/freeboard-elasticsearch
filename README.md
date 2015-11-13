# freeboard-elasticsearch
Example [Freeboard](https://github.com/Freeboard/freeboard) dashboards for [Elasticsearch](https://github.com/elastic/elasticsearch) ... for science

#### Config Loading Example

<pre>
freeboard.initialize(true);
  $.getJSON('path/to/freeboard.config.json', function(data) {
    freeboard.loadDashboard(data, function() {
      freeboard.setEditing(true);
    });
  });
</pre>

![](http://i.imgur.com/CvN5Zfl.png)
